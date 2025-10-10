import { Plugin } from '../types/plugins';

export const ToolRouterPlugin: Plugin = {
  name: 'tool-router',
  run: async (input: string) => {
    return `ToolRouterPlugin received: ${input}`;
  },
};
