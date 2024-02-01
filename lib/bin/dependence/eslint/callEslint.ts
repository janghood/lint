/**
 * @description bin eslint
 * @author 阿怪
 * @date 2022/11/18 10:13
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { EslintOption } from '@janghood/config';
import { ESLint, Linter } from 'eslint';
import { eslintLog, log, success } from '../tools';
import { resultsFormatter } from './resultsFormatter';
import { mergeEslint } from './mergeEslintConfig';
import { getAutoImports } from './nuxt/getAutoImports';
import nuxtEslintConfig from '../../../../config/eslint/nuxt.eslint.config';

const pwd = process.cwd();


export const callEslint = async (config?: EslintOption) => {

  eslintLog('====== 👮 eslint start ======');
  let baseConfig: Linter.Config = {};

  baseConfig = mergeEslint(config);

  if (config && config.nuxt) {
    const globalsKeys = getAutoImports();
    const globals: Record<string, 'readonly'> = {};
    globalsKeys.forEach((key) => {
      globals[key] = 'readonly';
    });
    baseConfig.globals = Object.assign(baseConfig.globals ?? {}, globals);
    baseConfig = mergeEslint({ config: nuxtEslintConfig }, baseConfig);
  }

  if (config && config.exclude) {
    if (Array.isArray(baseConfig.ignorePatterns)) {
      baseConfig.ignorePatterns.push(...config.exclude);
    }
    if (baseConfig.ignorePatterns) {
      baseConfig.ignorePatterns = [(baseConfig.ignorePatterns as string), ...config.exclude];
    }
    baseConfig.ignorePatterns = config.exclude;
  }

  const eslint = new ESLint({ baseConfig });
  const lintResults = await eslint.lintFiles(config && config.include ? config.include : '.');

  let resultMsg = '';
  let pass = 0, fail = 0;

  // todo fix file not found?

  lintResults.forEach(result => {
    const filePath = result.filePath.split(pwd)[1];

    if (result.messages.length === 0) {
      pass++;
      resultMsg += `✅ ${filePath} lint success\n`;
      return;
    }
    fail++;
    resultMsg += `❌ ${filePath} lint fail\n`;
    resultMsg += resultsFormatter(result);
    resultMsg += '\n\n';
  });

  if (fail === 0) {
    success('🎉 eslint all pass');
  } else {
    console.log(resultMsg + '\n');
    log(`🚨 eslint pass ${pass} file(s), fail ${fail} file(s)`);
  }


  eslintLog('====== 👮 eslint end ======');
};
