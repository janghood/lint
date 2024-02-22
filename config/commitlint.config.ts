/**
 * @description commit lint config
 * @author 阿怪
 * @date 2022/11/17 02:02
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { UserConfig } from '@commitlint/types';
import emojiRegex from 'emoji-regex';

const ignoreBucket = Boolean(process.env.SKIP_BUCKET);

const er = emojiRegex();

const test = (pattern: RegExp | string, value: string) => new RegExp(pattern).test(value);

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [0],
    'type-empty': [0],
    'janghood-commit-length': [2, 'always'],
    'janghood-first-emoji': [2, 'always'],
    'janghood-space': [2, 'always'],
    'janghood-square-bracket': [2, 'always'],
    'janghood-main-message': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'janghood-commit-length': ({ header }) => {
          return [header.length !== 1, '提交信息不可只有一个字符。 commit message length must be greater than 1.'];
        },
        'janghood-first-emoji': ({ header }) => {
          return [
            test(`^(${er})`, header), '提交首位必须是emoji。 commit message first char must be emoji.',
          ];
        },
        'janghood-space': ({ header }) => {
          return [
            test(`^(${er}) `, header),
            '提交emoji后必须跟空格。 commit message must have whitespace after emoji.',
          ];
        },
        'janghood-square-bracket': ({ header }) => {
          if (ignoreBucket) return [true];

          return [
            test(`^(${er}) \\[[^\\]]+\\]`, header),
            'emoji空格后必须跟随commit分类。 commit message must have commit type after emoji+whitespace.',
          ];
        },
        'janghood-main-message': ({ header }) => {
          const regex = ignoreBucket ? `^(${er}) (.)+` : `^(${er}) \\[[^\\]]+\\] (.)+`;

          return [
            test(regex, header),
            '提交信息必须有主体信息。 commit message must have main message.',
          ];
        },
      },
    },
  ],
};

export default Configuration;
