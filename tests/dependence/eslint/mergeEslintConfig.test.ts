/**
 * @description
 * @author 阿怪
 * @date 2022/11/24 21:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, test } from 'vitest';
import { mergeEslint } from '../../../lib/bin/dependence/eslint/mergeEslintConfig';
import eslintConfig from '../../../config/eslint.config';
import { Linter } from 'eslint';
import { EslintOption } from '../../../../config';


describe('mergeEslintConfig', () => {


  test('no config', () => {
    expect(mergeEslint()).toMatchObject(eslintConfig);
  });

  describe('merge', () => {

    test('merge object', () => {
      const config: Linter.Config = {
        env: { browser: false },
        parserOptions: {
          ecmaVersion: 2020,
          ecmaFeatures: { jsx: false }
        },
        rules: {
          '@janghood/test-rule': 'error'
        }
      };
      const resultConfig = mergeEslint({ config });
      expect(resultConfig.env).toMatchObject({ 'browser': false, 'es2021': true, 'node': true });
      expect(resultConfig.parserOptions).toMatchObject({
        'ecmaFeatures': { 'jsx': false },
        'ecmaVersion': 2020,
        'parser': '@typescript-eslint/parser',
        'sourceType': 'module'
      });
      expect(Object.keys(resultConfig.rules!).length).toBeGreaterThan(1);
      expect(resultConfig.rules!['@janghood/test-rule']).toBe('error');
    });

    test('overwrite object', () => {
      const config: EslintOption = {
        overwrite: {
          env: { browser: false },
          parserOptions: {
            ecmaVersion: 2020,
            ecmaFeatures: { jsx: false }
          },
          rules: {
            '@janghood/test-rule': 'error'
          }
        }
      };
      const resultConfig = mergeEslint(config );
      expect(resultConfig.env).toMatchObject({ 'browser': false });
      expect(resultConfig.parserOptions).toMatchObject({
        'ecmaFeatures': { 'jsx': false },
        'ecmaVersion': 2020
      });
      expect(Object.keys(resultConfig.rules!).length).toBe(1);
      expect(resultConfig.rules!['@janghood/test-rule']).toBe('error');
    });

  });


});
