/**
 * @description run lints
 * @author 阿怪
 * @date 2022/11/18 18:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * only support eslint right now.
 */
import { LintType } from '@janghood/config';
import { callEslint } from '../dependence/eslint/callEslint';
import { callOxlint } from '../dependence/oxlint/callOxlint';
import { eslintLog } from '../dependence/tools';


export const run = async (lint: LintType) => {

  if (lint.eslint) {
    eslintLog('====== 👮 eslint start ======');
    const oxlintRes = await callOxlint();
    await callEslint(lint.eslint);
    console.log(oxlintRes);
    eslintLog('====== 👮 eslint end ======');
  }

};
