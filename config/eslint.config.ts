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
import stylistic from '@stylistic/eslint-plugin';

const customized = stylistic.configs.customize({
  // the following options are the default values
  indent: 2,
  quotes: 'single',
  semi: true,
  jsx: true,
});

export default {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-plugin-oxlint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  // plugins: ['vue', '@typescript-eslint', '@stylistic', '@janghood'],
  plugins: ['vue', '@typescript-eslint', '@stylistic'],
  ignorePatterns: ['node_modules/*', 'dist', 'coverage'],
  rules: {
    ...customized.rules,
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-for': 'off',
    'no-const-assign': 'error',

    '@stylistic/block-spacing': 'off',
    '@stylistic/max-statements-per-line': 'off',
    '@stylistic/brace-style': 'off', // todo janghood style
    '@stylistic/no-multiple-empty-lines': 'off',
    '@stylistic/padded-blocks': 'off',
    '@stylistic/jsx-wrap-multilines': 'off',
    '@stylistic/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      beforeSelfClosing: 'never',
      'afterOpening': 'never',
      'beforeClosing': 'never',
    }],
    '@stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }],
    '@stylistic/type-annotation-spacing': ['error', {
      before: false,
      after: true,
      overrides: {
        arrow: { before: true, after: true },
      },
    }],
    '@stylistic/jsx-closing-tag-location': 'off',
    '@stylistic/multiline-ternary': 'off',
    '@stylistic/operator-linebreak': 'off',
    '@stylistic/jsx-one-expression-per-line': 'off',
    '@stylistic/jsx-max-props-per-line': 'off',
    '@stylistic/jsx-first-prop-new-line': 'off',
    '@stylistic/jsx-indent-props': 'off',
    '@stylistic/jsx-closing-bracket-location': 'off', // not perfect..
    '@stylistic/quote-props': ['error', 'as-needed'],

    '@stylistic/member-delimiter-style': 'off',
    // '@janghood/block-spacing-inline': 'error', // todo wait for janghood eslint plugin publish
  },
} as Linter.Config;

