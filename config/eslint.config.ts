/**
 * @description eslint config
 * @author 阿怪
 * @date 2022/11/17 02:02
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Linter } from 'eslint';

const eslintConfig: Linter.Config = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  ignorePatterns: ['node_modules/*', 'dist', 'coverage', '**/_types/*.d.ts'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': [2, { allow: ['arrowFunctions'] }],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/member-delimiter-style': [2, { multiline: { delimiter: 'comma', requireLast: false } }]
  }
};

export default eslintConfig;
