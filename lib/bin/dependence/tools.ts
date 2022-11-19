
/**
 * @description call tools
 * @author 阿怪
 * @date 2022/11/19 01:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Chalk } from 'chalk';

export const c = new Chalk({ level: 3 });

export const log = (info:string)=>{
  console.log(c.hex('#74787A')(info));
}
export const success = (info:string)=>{
  console.log(c.hex('#4A9992')(info));
}
export const error = (info:string)=>{
  console.log(c.hex('#861717')(info));
}
export const warn = (info:string)=>{
  console.log(c.hex('#E8B004')(info));
}




export const eslintLog = (info: string) => {
  console.log(c.hex('#4B32C3')(info));
};
