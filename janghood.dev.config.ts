/**
 * @description janghood lint config for dev
 * @author 阿怪
 * @date 2022/11/28 14:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineJhConfig } from '@janghood/config';

export default defineJhConfig({
  base: {
    include: ['lib/**/*', 'example/**/*'],
    exclude: ['callEslint.ts']
  },
  lint: {
    eslint: true,
    commitlint: true
  }
});
