/**
 * @description is add commit msg inquirer
 * @author 阿怪
 * @date 2024/2/22 16:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import inquirer from 'inquirer';
import { osLocale } from 'os-locale';

const locale = await osLocale();

enum ZH {
  MSG = '请选择您的commit配置',
  CUSTOM = '我选择随心所欲commit',
  PROJECT = '我愿意遵循本项目的commit规范',
}

enum EN {
  MSG = 'Please choose your commit configuration',
  CUSTOM = 'I choose to commit as I like',
  PROJECT = 'I am willing to follow the commit specification of this project',
}

const LANG = locale.includes('zh') ? ZH : EN;


export const isAddCommitMsg = async () => {
  const res = await inquirer.prompt([
    {
      type: 'list',
      name: 'commit',
      default: LANG.PROJECT,
      message: LANG.MSG,
      choices: [
        LANG.PROJECT,
        LANG.CUSTOM,
      ],
    },
  ]);
  return res.commit === LANG.PROJECT;
};
