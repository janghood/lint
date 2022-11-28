/**
 * @description 合并eslint config 方法，
 * @author 阿怪
 * @date 2022/11/24 21:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import baseEslintConfig from '../../../../config/eslint.config';
import { EslintOption } from '@janghood/config';
import { Linter } from 'eslint';

type JHEslintObjectOption = 'env' | 'parserOptions' | 'rules';
type JHEslintArrayOption = 'extends' | 'plugins' | 'ignorePatterns';


export const mergeEslint = (option?: EslintOption, eslintConfig = baseEslintConfig) => {


  const mergeObject = <T extends JHEslintObjectOption>(key: T, option: Linter.Config[T]) => {
    return Object.assign(eslintConfig[key]!, option);
  };

  const mergeArray = <T extends JHEslintArrayOption>(key: T, option: Linter.Config[T]) => {
    if (!option) return eslintConfig[key];
    if (typeof option === 'string') return [option, ...eslintConfig[key]!];
    return [...new Set([...option, ...eslintConfig[key]!])];
  };

  if (!option) {
    return eslintConfig;
  }
  const { config, overwrite } = option;
  let newConfig: Linter.Config = {};
  if (config) {
    newConfig = Object.assign({}, config);
    if (config['env']) {newConfig['env'] = mergeObject('env', config.env);}
    if (config['parserOptions']) {newConfig['parserOptions'] = mergeObject('parserOptions', config.parserOptions);}
    if (config['rules']) {newConfig['rules'] = mergeObject('rules', config.rules);}
    if (config['extends']) {newConfig['extends'] = mergeArray('extends', config.extends);}
    if (config['plugins']) {newConfig['plugins'] = mergeArray('plugins', config.plugins);}
    if (config['ignorePatterns']) {newConfig['ignorePatterns'] = mergeArray('ignorePatterns', config.ignorePatterns);}
    if (config.parser) {newConfig.parser = config.parser;}
  } else {
    newConfig = Object.assign({}, eslintConfig);
  }
  if (overwrite) {
    Object.assign(newConfig, overwrite);
  }
  return newConfig;
};
