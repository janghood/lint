/**
 * @description install lints
 * @author 阿怪
 * @date 2022/11/18 18:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { LintType } from '@janghood/config';
import husky from 'husky';
import p from 'path';
import fs from 'fs';
import { error, log, success } from '../dependence/tools';
import { isAddCommitMsg } from './install/isAddCommitMsg';

const commitMsg = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit --config ./node_modules/@janghood/lint/dist/commitlint.cjs
`;

const prePushMsg = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
`;

const dir = '.husky';

const prepare = () => {
  husky(dir);
  if (!p.resolve(process.cwd(), dir).startsWith(process.cwd())) {
    error(`.. not allowed`);
    return;
  }
  if (!fs.existsSync('.git')) {
    error(`.git can't be found `);
    return;
  }

  return true;
};


const writeFile = (path: string, content: string) => {
  fs.writeFileSync(p.join(dir, path), content);
  fs.chmodSync(p.join(dir, path), 0o755);
};

export const install = async (lint: LintType, options: { update: boolean, project: boolean }) => {
  // check .husky
  if (fs.existsSync(dir) && !options.update) {
    return;
  }

  const commitMsgAdd = await isAddCommitMsg(options.project);

  log('installing commitlint git hook...');
  if (!lint.commitlint) {return;}
  if (!prepare()) {return;}

  try {
    if (commitMsgAdd) {
      writeFile('commit-msg', commitMsg);
    }
    writeFile('pre-push', prePushMsg);
  } catch (e) {
    error('install failed');
    throw e;
  }

  success('install success');
};
