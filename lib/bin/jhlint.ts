/**
 * @description janghood lint bin
 * @author 阿怪
 * @date 2022/11/17 02:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { run } from './channel/run';
import { install } from './channel/install';
import { cac } from 'cac';
import { initLintConfig } from './cli/initLintConfig';

const cli = cac('jhlint');

cli.command('[type]', 'start lint')
  .option('--config, -c <path>', 'config file path')
  .action(async (type, options) => {

    const { config } = options;
    const lintConfig = await initLintConfig(config);
    if (!lintConfig) {return;}
    const { lint } = lintConfig;


    if (type === 'install') {
      await install(lint);
      return;
    }

    await run(lint);
    return;
  });


cli.help();
cli.parse();
