import { Plugin } from '../core/PluginManager';

export const ToolRouterPlugin: Plugin = {
  name: 'tool-router',
  run: async (input: string) => {
    return { modifiedInput: `ToolRouterPlugin received: ${input}` };
  },
};
