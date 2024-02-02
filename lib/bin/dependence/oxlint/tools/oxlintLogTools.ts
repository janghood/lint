/**
 * @description
 * @author 阿怪
 * @date 2024/2/2 10:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { warningHandler } from './warningLogTools';
import { resultLogHandler } from './resultLogHandler';


export const handleOxlintLog = (output: string) => {

  output = output.trim();
  if (output.startsWith('Finished')) {
    return resultLogHandler(output);
  } else if (output[0].charCodeAt(0) === 27 || output.startsWith('!')) {
    return warningHandler(output);
  }
  return '-------\n' + output + '\n\n';
};
