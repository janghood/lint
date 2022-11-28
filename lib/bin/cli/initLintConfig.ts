/**
 * @description init lint config.
 * @author 阿怪
 * @date 2022/11/28 14:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { initConfig, loadJanghoodConfig } from '@janghood/config';
import { error } from '../dependence/tools';

export const initLintConfig = async (configFilePath?: string) => {
  const inlineConfig = {};
  if (configFilePath) {
    const loadInfo = await loadJanghoodConfig(configFilePath);
    if (loadInfo) {
      Object.assign(inlineConfig, loadInfo.config);
    }
  }
  const janghoodConfig = await initConfig(Object.keys(inlineConfig).length > 0 ? inlineConfig : undefined);
  if (!janghoodConfig || !janghoodConfig.lint) {
    error('Janghood config is not found, please check your config file.');
    return;
  }

  return { lint: janghoodConfig.lint };
};
