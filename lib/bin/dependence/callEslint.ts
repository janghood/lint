/**
 * @description bin eslint
 * @author 阿怪
 * @date 2022/11/18 10:13
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { EslintOption } from '@janghood/config';
import { ESLint } from 'eslint';
import eslintConfig from '../../../config/eslint.config';
import chalk from 'chalk';
import table from 'text-table';
import stripAnsi from 'strip-ansi';
import { easyClone } from '../../../../config/lib/init/tools';

const pwd = process.cwd();

const resultsFormatter = (result: ESLint.LintResult) => {
  let summaryColor = 'yellow';
  const output = `${table(
    result.messages.map(message => {
      let messageType;

      if (message.fatal || message.severity === 2) {
        messageType = chalk.red('error');
        summaryColor = 'red';
      } else {
        messageType = chalk.yellow('warning');
      }

      return [
        '',
        message.line || 0,
        message.column || 0,
        messageType,
        message.message.replace(/([^ ])\.$/u, '$1'),
        chalk.dim(message.ruleId || '')
      ];
    }),
    {
      align: [null, 'r', 'l'],
      stringLength(str) {
        return stripAnsi(str).length;
      }
    }
  ).split('\n')
    .map(el => el.replace(
        /(\d+)\s+(\d+)/u,
        // todo ?? why eslint can print number and have clickable link?
        (m, p1, p2) => chalk.dim(`${result.filePath.split(pwd)[1]}:${p1}:${p2}`)
      )
    )
    .join('\n')
  }`;

  console.log(output);

};


const eslintChalk = chalk.hex('#4B32C3');
const log = (info: string) => {
  console.log(eslintChalk(info));
};

export const callEslint = async (config?: EslintOption) => {

  log('====== 👮 eslint start ======');

  const baseConfig = easyClone(eslintConfig);

  if (config && config.exclude) {baseConfig.ignorePatterns.push(...config.exclude);}

  const eslint = new ESLint({ baseConfig });
  const lintResults = await eslint.lintFiles(config && config.include ? config.include : '.');

  lintResults.forEach(result => {
    const filePath = result.filePath.split(pwd)[1];

    if (result.messages.length === 0) {
      console.log(`✅ ${filePath} lint success`);
      return;
    }

    console.group(`❌ ${filePath} lint fail`);
    resultsFormatter(result);


    console.groupEnd();
  });

  log('====== 👮 eslint end ======');
};
