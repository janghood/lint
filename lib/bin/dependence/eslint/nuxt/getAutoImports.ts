/**
 * @description get nuxt auto import
 * @author 阿怪
 * @date 2022/11/26 02:09
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import fs from 'fs';


export const getAutoImports = () => {
  const pwd = process.cwd();
  const globals = [];

  const nuxtAutoImportFile = `${pwd}/.nuxt/types/imports.d.ts`;
  const fileInfo = fs.readFileSync(nuxtAutoImportFile, 'utf-8');

  const globalImport = fileInfo.match(/const ([^:])*/g);
  if (globalImport) {
    globals.push(...globalImport.map(e => e.replace('const ', '')));
  }
  const vueRuntimeCore = fileInfo.match(/readonly ([^:]*)}/g);
  if (vueRuntimeCore) {
    globals.push(...vueRuntimeCore.map(e => e.replace('readonly ', '').replace('}', '')));
  }

  return globals;
};
