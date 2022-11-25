/**
 * @description nuxt getAutoImports test
 * @author 阿怪
 * @date 2022/11/26 02:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { describe, test, expect } from 'vitest';
import { getAutoImports } from '../../../lib/bin/dependence/eslint/nuxt/getAutoImports';

describe('getAutoImport', () => {

  test('should get auto import', () => {

    const result = getAutoImports();
    expect(result.length).toBe(102);
  });

});
