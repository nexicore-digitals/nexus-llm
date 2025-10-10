import { Plugin } from '../core/PluginManager';
import { RouterContext } from '../types/router';

export const ToolRouterPlugin: Plugin = {
  name: 'tool-router',
  run: async (input: string, context?: RouterContext) => {
    return { modifiedInput: `ToolRouterPlugin received: ${input}` };
  },
};
