/**
 * @description cli initLintConfig test
 * @author 阿怪
 * @date 2022/11/28 15:25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, test, expect } from 'vitest';
import { initLintConfig } from '../../../lib/bin/cli/initLintConfig';


describe('cli initLintConfig', () => {

  test('no config path', async () => {
    const res = await initLintConfig();
    expect(res).toMatchInlineSnapshot(`
      {
        "lint": {
          "commitlint": true,
          "eslint": {
            "exclude": [
              "callEslint.ts",
            ],
            "include": [
              "lib/**/*",
            ],
          },
        },
      }
    `);
  });

  test('with path', async () => {
    const res = await initLintConfig('janghood.dev.config.ts');
    expect(res).toMatchInlineSnapshot(`
      {
        "lint": {
          "commitlint": true,
          "eslint": {
            "exclude": [
              "callEslint.ts",
            ],
            "include": [
              "lib/**/*",
              "example/**/*",
            ],
          },
        },
      }
    `);
  });

});
