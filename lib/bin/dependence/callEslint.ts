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
import { error, eslintLog, log, success } from './tools';


const pwd = process.cwd();


const resultsFormatter = (result: ESLint.LintResult) => {
  let summaryColor = '#E8B004';
  return `${table(
    result.messages.map(message => {
      let messageType;

      if (message.fatal || message.severity === 2) {
        messageType = chalk.hex('#861717')('error');
        summaryColor = '#861717';
      } else {
        messageType = chalk.hex('#E8B004')('warning');
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
};

export const callEslint = async (config?: EslintOption) => {

  eslintLog('====== 👮 eslint start ======');

  const baseConfig = Object.assign({}, eslintConfig);

  if (config && config.exclude) {(baseConfig.ignorePatterns as string[]).push(...config.exclude);}

  const eslint = new ESLint({ baseConfig });
  const lintResults = await eslint.lintFiles(config && config.include ? config.include : '.');

  let resultMsg = '';
  let pass = 0, fail = 0;

  lintResults.forEach(result => {
    const filePath = result.filePath.split(pwd)[1];

    if (result.messages.length === 0) {
      pass++;
      resultMsg += `✅ ${filePath} lint success\n`;
      return;
    }
    fail++;
    resultMsg += `❌ ${filePath} lint fail\n`;
    resultMsg += resultsFormatter(result);
    resultMsg += '\n\n';
  });

  if (fail === 0) {
    success('🎉 eslint all pass');
  } else {
    console.log(resultMsg + '\n');
    log(`🚨 eslint pass ${pass} file(s), fail ${fail} file(s)`);
  }


  eslintLog('====== 👮 eslint end ======');
};
