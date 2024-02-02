/**
 * @description
 * @author 阿怪
 * @date 2024/2/2 14:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { c } from '../../tools';
import { resultLogHandler } from './resultLogHandler';

const splitStringAt = (str: string, i: number): [string, string] => {
  const firstPart = str.slice(0, i);
  const secondPart = str.slice(i);
  return [firstPart, secondPart];
};

const removeRule = (str: string, i: number): string => {
  return str.slice(i);
};

const splitRule = (str: string): [string, string] => {
  // 粗暴用:分割
  const splitIndex = str.indexOf(':');
  return splitStringAt(str, splitIndex);
};

const getSpace = (row: string): string => {
  let space = '';
  for (let j = 0; j < row.length; j++) {
    if (row[j] === ' ') {
      space += row[j];
    } else {
      break;
    }
  }
  return space;
};

const formatWarningRows = (rows: string[]): string => {

  let logs: string[] = [''];
  let i = 0;
  for (i; i < rows.length; i++) {
    let row = rows[i];
    if (row.startsWith('Finished')) {
      // 整合剩下的row
      const result = rows.slice(i, rows.length).join('\n');
      logs.push(resultLogHandler(result));
      continue;
    }
    const trimRow = row.trim();
    if (trimRow.startsWith(':')) {
      row = row.replaceAll('^|^','─┬─');
      if (row.includes('^^')) {
        logs.push(row.replaceAll('^', '─'));
        continue;
      }
      row = row.replaceAll('^','▲')
        .replaceAll('`--','╰──');
    }
    if (row.includes('`---')) {
      // 获取空格长度
      const space = getSpace(row);
      logs.push(`${space}╰────────`);
      logs[0] = `${space}╭────────`;
      continue;
    }


    logs.push(row);
  }


  return logs.join('\n') + '\n';

};

const handlerWarningInfo = (info: string) => {
  // 第一行是文件路径
  info = info.trim();
  const firstLineIndex = info.indexOf('\n');
  let filePathStr = info.slice(0, firstLineIndex).trim();
  filePathStr = filePathStr.slice(3, filePathStr.length - 1);

  // 截取末尾的两个冒号
  let colonIndex = filePathStr.lastIndexOf(':');
  const [preInfo, colWithColon] = splitStringAt(filePathStr, colonIndex);
  colonIndex = preInfo.lastIndexOf(':');
  let [filePath, rowWithColon] = splitStringAt(preInfo, colonIndex);
  const col = colWithColon.slice(1);
  const row = rowWithColon.slice(1);
  filePath = filePath.replace('\x1B[1m.', '\x1B[1m');

  let result = '';

  result += c.dim(`     ${filePath}:${row}:${col}\n`);
  result += formatWarningRows(info.slice(firstLineIndex + 1, info.length).split('\n'));
  return result;
};

const ASCIIMatch = (log: string): string[] => {
  // 有ASCII码，所以需要手动匹配下
  const rows = log.split('\n');
  const match: string[] = [];
  rows.forEach(row => {
    if (row.trim().startsWith('\x1b[33m!')) {
      match.push(row);
    }
  });
  return match;
};

export const warningHandler = (log: string) => {
  try {
    // ESC [ 3 3 m

    // 清除log开头的ASCII代码
    const i = log.indexOf('!');
    let matchArr: string[] = [];
    if (i !== -1) {
      matchArr = ASCIIMatch(log);

    } else {
      const regex = /! .+?\n/gs;
      log.match(regex)?.forEach(m => {
        matchArr.push(m);
      });
    }


    if (!matchArr || matchArr.length === 0) return '';
    const block: Array<{ rule: [string, string], info: string }> = [{ rule: splitRule(matchArr[0]), info: '' }];
    log = removeRule(log, matchArr[0].length);

    matchArr.forEach((rule, i) => {
      if (i === 0) return;
      const splitIndex = log.indexOf(rule);
      const [preErrorLog, leftStr] = splitStringAt(log, splitIndex);
      log = removeRule(leftStr, rule.length);
      // 这里是给上一个rule的info赋值
      block[i - 1].info = handlerWarningInfo(preErrorLog);
      block.push({ rule: splitRule(rule), info: '' });
    });

    block[block.length - 1].info = handlerWarningInfo(log);


    let result = '';
    block.forEach(b => {
      result += `${c(b.rule[0])}${c.red(b.rule[1])}\n${b.info}\n\n`;
    });


    return result;
  } catch (e) {
    console.error('split error', e);
  }


  // 使用匹配结果来切分文本


  return '';
};
