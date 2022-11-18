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



const jhlint = async () => {

  const janghoodConfig = await initConfig();
  if (!janghoodConfig || !janghoodConfig.lint) {
    error('Janghood config is not found, please check your config file.')
    return;
  }
  const { lint } = janghoodConfig;
  const { argv } = process;
  if (argv.length < 2) {
    await run(lint);
    return;
  }

  const type = argv[2];
  if (type === 'install') {
    await install(lint);
    return;
  }

  await run(lint);

};

jhlint();



