/**
 * @description commitlint test case
 * @author 阿怪
 * @date 2024/2/22 09:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from 'vitest';
import commitLint from '@commitlint/lint';
import Configuration from '../../config/commitlint.config';
import { QualifiedRules } from '@commitlint/types';
import { PluginRecords } from '@commitlint/types/lib/load';

const lint = async (msg: string) => await commitLint(
  msg,
  Configuration.rules as QualifiedRules,
  { plugins: Configuration.plugins as unknown as PluginRecords },
);

describe('commitlint', () => {

  describe('false', () => {
    test('janghood-commit-length', async () => {
      const res = await lint('1');
      expect(res.valid).toBe(false);
      expect(res.errors[0].name).toBe('janghood-commit-length');
    });

    describe('janghood-first-emoji', () => {

      test('fail: 123', async () => {
        const res = await lint('123');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).toBe('janghood-first-emoji');
      });

      test('pass: 🏗️', async () => {
        const res = await lint('🏗️');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).not.toBe('janghood-first-emoji');
      });

      test('pass: 💥', async () => {
        const res = await lint('💥');
        expect(res.valid).toBe(false);
        console.log(res.errors.length);
        expect(res.errors[0].name).not.toBe('janghood-first-emoji');
      });

    });

    describe('janghood-space', () => {

      test('fail: 💥', async () => {
        const res = await lint('💥');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).toBe('janghood-space');
      });

      test('pass: 💥 ', async () => {
        const res = await lint('💥 ');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).not.toBe('janghood-space');
      });

      test('pass: 🏗️ ', async () => {
        const res = await lint('🏗️ ');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).not.toBe('janghood-space');
      });

      test('fail: 💥1', async () => {
        const res = await lint('💥1');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).toBe('janghood-space');
      });
    });


    describe('janghood-square-bracket', async () => {

      test('fail: 💥 [feat', async () => {
        const res = await lint('💥 [feat');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).toBe('janghood-square-bracket');
      })

      test('fail: 💥 []', async () => {
        const res = await lint('💥 []');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).toBe('janghood-square-bracket');
      })

      test('fail: 💥 【feat】', async () => {
        const res = await lint('💥 【feat】');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).toBe('janghood-square-bracket');
      })

      test('pass: 💥 [feat]', async () => {
        const res = await lint('💥 [feat]');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).not.toBe('janghood-square-bracket');
      })

    })

    describe('janghood-square-bracket-space', async () => {
      test('fail: 💥 [feat]change', async () => {
        const res = await lint('💥 [feat]change');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).toBe('janghood-square-bracket-space');
      });
    })

    describe('janghood-main-message', async () => {
      test('fail: 💥 [feat] ', async () => {
        const res = await lint('💥 [feat] ');
        expect(res.valid).toBe(false);
        expect(res.errors[0].name).toBe('janghood-main-message');
      });

      test('pass: 💥 [feat] change', async () => {
        const res = await lint('💥 [feat] change');
        expect(res.valid).toBe(true);
      });
    })

    describe('pass',()=>{
      test('🏗️ [ci] ci test',()=>{
        const res = lint('🏗️ [ci] ci test');
        expect(res).toBeTruthy();
      });

      test('🗺️ [router] fix router error' , ()=>{
        const res = lint('🗺️ [router] fix router error');
        expect(res).toBeTruthy();
      })
    })
  });

});
