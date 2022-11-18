/**
 * @description janghood lint bin
 * @author 阿怪
 * @date 2022/11/17 02:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { initConfig } from '@janghood/config';
import { callEslint } from './dependence/callEslint';

const run = async () => {
  const janghoodConfig = await initConfig();

  if (janghoodConfig && janghoodConfig.lint) {

    const { lint } = janghoodConfig;
    if (lint.eslint) {
      await callEslint(lint.eslint);
    }

  }
};

run();
