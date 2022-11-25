/**
 * @description nuxt3 eslint
 * @author 阿怪
 * @date 2022/11/26 01:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * support global value! actually nuxt should support it.
 */
import { Linter } from 'eslint';

const eslintNuxtConfig: Linter.Config = {
  extends: ['@nuxtjs/eslint-config-typescript'],
  rules: {
    'vue/html-closing-bracket-spacing': 'off',
    'no-multiple-empty-lines': 'off',
    'semi': [2, 'always']
  }
};

export default eslintNuxtConfig;
