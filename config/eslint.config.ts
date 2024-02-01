/**
 * @description eslint config
 * @author 阿怪
 * @date 2022/11/17 02:02
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 后续考虑发布到npm上，用extends
 */
import { Linter } from 'eslint';

export default {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['vue', '@typescript-eslint', '@stylistic'],
  ignorePatterns: ['node_modules/*', 'dist', 'coverage'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-for': 'off',
  },
} as Linter.Config;

