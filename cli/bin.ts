/**
 * @description
 * @author 阿怪
 * @date 2024/2/3 01:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


// 给dist/bin/jhlint.js添加shebang
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./dist/bin/jhlint.mjs');
const file = fs.readFileSync(filePath, 'utf-8');
const shebang = `#!/usr/bin/env node
'use strict';

`;
fs.writeFileSync(filePath, shebang + file);
