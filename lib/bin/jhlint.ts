/**
 * @description janghood lint bin
 * @author 阿怪
 * @date 2022/11/17 02:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { initConfig } from '@janghood/config';
import { run } from './channel/run';
import { install } from './channel/install';
import { error } from './dependence/tools';
import { cac } from 'cac';

const cli = cac('jhlint');

cli.command('[type]', 'start lint')
  .option('--config, -c <path>', 'config file path')
  .action(async (type, options) => {

    const { config } = options;
    const inlineConfig = {};
    if (config) {
      // todo get config info
    }
    const janghoodConfig = await initConfig(Object.keys(inlineConfig).length > 0 ? inlineConfig : undefined);
    if (!janghoodConfig || !janghoodConfig.lint) {
      error('Janghood config is not found, please check your config file.');
      return;
    }
    const { lint } = janghoodConfig;
    if (type === 'install') {
      await install(lint);
      return;
    }

    await run(lint);
    return;
  });


cli.help();

cli.parse();
