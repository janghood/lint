/**
 * @description
 * @author 阿怪
 * @date 2024/2/2 22:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { c } from '../../tools';

const cLog = (color: string, text: string) => {
  return c.hex(color)(text);
};

const oxlintC = (text: string) => cLog('#9be4e0', text);
const numC = (text: string) => cLog('#4C8045', text);

const oxlintLog = (time: string, files: string, rules: string, threads: string) => {
  return `${oxlintC(`⚡️ oxlint Finished in `)}${cLog('#A81C2B', `${time} `)}${oxlintC(`on `)}${numC(`${files} `)}${oxlintC(`files with `)}${numC(`${rules} `)}${oxlintC(`rules using `)}${numC(`${threads} `)}${oxlintC(`threads.`)}`;
};

const foundLog = (warnings: string, errors: string) => {
  return `${oxlintC(`⚠️ Found `)}${cLog('#E8B004', `${warnings} `)}${oxlintC(`warnings and `)}${cLog('#861717', `${errors} `)}${oxlintC(`errors.`)}`;
};


export const resultLogHandler = (log: string) => {
  let output = '';
  const data = /Finished in \d+ms on \d+ files with \d+ rules using \d+ threads./g.exec(log)?.[0] ?? log;
  const chars = data.split(' ');
  const time = chars[2];
  const files = chars[4];
  const rules = chars[7];
  const threads = chars[10];
  output += oxlintLog(time, files, rules, threads);
  // 判断是否有换行
  if (log.includes('\n')) {
    // Found日志
    const foundLogMatch = log.split('\n').filter(item => item.includes('Found'));
    if (foundLogMatch.length > 0) {
      const foundLogStr = foundLogMatch[0];
      const foundChars = foundLogStr.split(' ');
      const warnings = foundChars[1];
      const errors = foundChars[4];
      output += '\n' + foundLog(warnings, errors);
    }
  }
  return output;
};
