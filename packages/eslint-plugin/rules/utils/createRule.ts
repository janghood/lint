/**
 * copy from https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin-js/utils/createRule.ts
 */

import type { TSESLint } from '@typescript-eslint/utils';
import type { Rule } from 'eslint';

export function createRule<MessageIds extends string, RuleOptions extends any[]>(
  rule: Omit<TSESLint.RuleModule<MessageIds, RuleOptions>, 'defaultOptions'>,
) {
  return rule as unknown as Rule.RuleModule;
}
