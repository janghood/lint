/**
 * @description
 * @author 阿怪
 * @date 2022/11/17 02:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';


const buildBaseConfig = {
  plugins: [typescript(), json()]
};

export default [
  {
    ...buildBaseConfig,
    input: 'config/eslint.config.ts',
    output: [{
      sourcemap: true,
      file: 'dist/eslint.js',
      format: 'cjs'
    }]
  },
  {
    ...buildBaseConfig,
    input: 'config/commitlint.config.ts',
    output: [{
      sourcemap: true,
      file: 'dist/commitlint.cjs',
      format: 'cjs'
    }]
  },
  {
    ...buildBaseConfig,
    input: 'lib/bin/jhlint.ts',
    output: [{ file: 'output/bin/jhlint-prev.js' }],
  },
  {
    ...buildBaseConfig,
    input: 'output/bin/jhlint-prev.js',
    output: [{
      sourcemap: true,
      file: 'dist/bin/jhlint.js'
    }],
    external: ['eslint'],
    plugins: [
      nodeResolve(),
      commonjs(),
      json()
    ]
  }
];
