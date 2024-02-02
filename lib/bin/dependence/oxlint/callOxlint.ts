/**
 * @description
 * @author 阿怪
 * @date 2024/2/1 23:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { exec } from 'node:child_process';
import { handleOxlintLog } from './tools/oxlintLogTools';

export const callOxlint = () => {
  return new Promise<string>((resolve, reject) => {
    const command = 'oxlint .';
    // 会丢失fmt, 因为exec他没连接到终端
    const { stdout, stderr } = exec(command);
    let log = '';
    if (stdout) {
      stdout.on('data', (output) => {
        log += output;
      });
      stdout.on('end', () => {
        // todo if oxlint can provide a stronger output, we can remove this
        resolve(handleOxlintLog(log));
      });
    }
    if (stderr) {
      stderr.on('data', (data) => {
        reject(`oxlint error:${data}`);
      });
    }
  });
};