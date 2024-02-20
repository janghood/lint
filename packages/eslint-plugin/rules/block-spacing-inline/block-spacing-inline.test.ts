/**
 * @description
 * @author 阿怪
 * @date 2024/2/19 17:09
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, test } from 'vitest';
import { RuleTester } from 'eslint';
import rule from './block-spacing-inline';

const ruleTester = new RuleTester();

const runTest = (test: {
  valid?: Array<string | RuleTester.ValidTestCase>, invalid?: RuleTester.InvalidTestCase[]
}) => {
  ruleTester.run('block-spacing-inline', rule, {
    valid: test.valid ?? [],
    invalid: test.invalid ?? [],
  });
};

describe('block-spacing-inline', () => {
  describe('valid', () => {

    test('{ foo(); }', () => {
      runTest({ valid: ['{ foo(); }'] });
    });

    test('{foo();}', () => {
      runTest({ valid: ['{foo();}'] });
    });

    test('try {foo();} catch (e) {foo();} finally {foo();}', () => {
      runTest({ valid: ['try {foo();} catch (e) {foo();} finally {foo();}'] });
    });
  });

  describe('invalid', () => {
    test('{ foo();}', () => {
      runTest({
        invalid: [{
          code: '{ foo();}',
          output: '{ foo(); }',
          errors: [
            {
              type: 'BlockStatement',
              line: 1,
              column: 9,
              messageId: 'missing',
              data: { location: 'before', token: '}' },
            },
          ],
        }],
      });
    });

    test('try {foo();} catch (e) {foo(); } finally {foo();}',()=>{
      runTest({
        invalid:[
          {
            code: 'try {foo();} catch (e) {foo(); } finally {foo();}',
            output: 'try {foo();} catch (e) { foo(); } finally {foo();}',
            errors: [
              {
                type: 'BlockStatement',
                messageId: 'missing',
                data: { location: 'after', token: '{' },
                line: 1,
                column: 24,
                endLine: 1,
                endColumn: 25,
              }
            ],
          },
        ]
      })
    })
  });
});
