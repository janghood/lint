/**
 * @description
 * @author 阿怪
 * @date 2024/2/19 15:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createRule } from '../utils/createRule';
import type { TSESTree } from '@typescript-eslint/types';
import EPJ from '@stylistic/eslint-plugin-js';
import type { Rule } from 'eslint';

type RuleContext = Rule.RuleContext;
type ReportDescriptor = Rule.ReportDescriptor;
type ReportDescriptorLocation = Rule.ReportDescriptor & { node: TSESTree.Node };

const getRangeSource = (node: TSESTree.Node, sourceCode: RuleContext['sourceCode']) => {
  const range = node.range;
  const start = range[0];
  const end = range[1];
  return sourceCode.text.slice(start, end);
}

export default createRule({
  defaultOptions: ['always'],
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description: 'Disallow or enforce spaces inside of blocks after opening block and before closing block',
      url: 'https://eslint.style/rules/js/block-spacing',
    },
    schema: [
      { type: 'string', enum: ['always', 'never'] },
    ],
    messages: {
      missing: 'Requires a space {{location}} \'{{token}}\'.',
      extra: 'Unexpected space(s) {{location}} \'{{token}}\'.',
    },
  },
  create(context: RuleContext) {
    const descriptors: ReportDescriptor[] = [];
    const mockContext: Partial<RuleContext> = {
      options: context.options,
      sourceCode: context.sourceCode,
      report: (descriptor: ReportDescriptor) => {
        descriptors.push(descriptor);
      },
    };
    const listener = EPJ.rules['block-spacing'].create(mockContext as RuleContext);
    // console.log('create', context.sourceCode.getText());

    const check = (node: TSESTree.BlockStatement) => {
      const bodyMap = new Map();
      let reports: ReportDescriptor[] = [];
      const removeIndex: number[] = [];
      if (typeof listener.BlockStatement === 'function') {
        // 对于每个node都做一下处理

        // 清理descriptors
        descriptors.length = 0;
        // console.log(getRangeSource(node, context.sourceCode));
        listener.BlockStatement(node);

        descriptors.forEach(d => {
          const n = (d as ReportDescriptorLocation).node;
          const body = n.body[0];
          // console.log(n.type, body, d.data);
          // console.log(d);
          if (bodyMap.has(body)) {
            const { d: preBodyError, i: preI } = bodyMap.get(body);
            const { location, token } = preBodyError.data;
            if (location === 'after' && token === '{') {
              bodyMap.delete(body);
              removeIndex.push(preI);
            } else {
              console.warn('error', d);
            }

          } else {
            reports.push(d);
            bodyMap.set(body, { d, i: reports.length - 1 });
          }
        });
        reports = reports.filter((_, i) => !removeIndex.includes(i));
        reports.forEach(r=>{
          context.report(r)
        });
      }
    };

    return {
      BlockStatement: check,
    };
  },
});
