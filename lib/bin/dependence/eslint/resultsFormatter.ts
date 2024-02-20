/**
 * @description
 * @author 阿怪
 * @date 2022/11/24 21:26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ESLint } from 'eslint';
import table from 'text-table';
import { c } from '../tools';
import stripAnsi from 'strip-ansi';

const pwd = process.cwd();

export const resultsFormatter = (result: ESLint.LintResult) => {
  return `${table(
    result.messages.map(message => {
      let messageType;

      if (message.fatal || message.severity === 2) {
        messageType = c.hex('#861717')('error');
      } else {
        messageType = c.hex('#E8B004')('warning');
      }

      return [
        '',
        message.line || 0,
        message.column || 0,
        messageType,
        message.message.replace(/([^ ])\.$/u, '$1'),
        c.dim(message.ruleId || ''),
      ];
    }),
    {
      align: [null, 'r', 'l'],
      stringLength(str) {
        return stripAnsi(str).length;
      },
    },
  ).split('\n')
    .map(el => el.replace(
        /(\d+)\s+(\d+)/u,
        // todo ?? why eslint can print number and have clickable link?
        (m, p1, p2) => c.dim(`${result.filePath.split(pwd)[1]}:${p1}:${p2}`),
      ),
    )
    .join('\n')
  }`;
};
