/**
 * @description
 * @author 阿怪
 * @date 2024/2/2 10:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';
import { handleOxlintLog } from '../../../lib/bin/dependence/oxlint/tools/oxlintLogTools';


describe('oxlintLogTools', () => {

  const readFile = (file: string) => fs.readFileSync(path.resolve(`./tests/dependence/oxlint/demoLog/${file}.log`), 'utf-8');
  const successOutput = readFile('success');
  const warningOutput = readFile('warning');
  // const warningOutput = fs.readFileSync('./demoLog/warning.log', 'utf-8');

  test('success', () => {
    const res = handleOxlintLog(successOutput);
    const resList = res.split('\x1B[38;2');
    expect(resList[1]).include('⚡️ oxlint Finished in ');
    expect(resList[2]).include('11ms');
    expect(resList[3]).include('on');
    expect(resList[4]).include('22');
    expect(resList[5]).include('files with ');
    expect(resList[6]).include('84');
    expect(resList[7]).include('rules using ');
    expect(resList[8]).include('16');
    expect(resList[9]).include('threads');
    expect(resList[10]).include('⚠️ Found ');
    expect(resList[11]).include('0');
    expect(resList[12]).include('warnings and ');
    expect(resList[13]).include('0');
    expect(resList[14]).include('errors.');
  });

  test('warning', () => {
    const res = handleOxlintLog(warningOutput);

  });


});
