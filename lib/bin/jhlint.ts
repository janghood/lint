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

const getLint = async (options: any) => {
  const { config } = options;
  const lintConfig = await initLintConfig(config);
  if (!lintConfig) {return;}
  const { lint } = lintConfig;
  return lint;
};

cli.command('', 'start lint')
  .option('--config, -c <path>', 'config file path')
  .action(async options => {
    const lint = await getLint(options);
    if (!lint) {return;}
    await run(lint);
    return;
  });

cli.command('install', 'install lint hook')
  .option('--config, -c <path>', 'config file path')
  .option('--update, -u', 'update install')
  .option('--project, -p', 'use project type commitlint')
  .action(async options => {
    const lint = await getLint(options);
    if (!lint) {return;}
    await install(lint, options);
  });


cli.help();
cli.parse();
