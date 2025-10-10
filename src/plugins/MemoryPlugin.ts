import { Plugin } from '../core/PluginManager';
import { RouterContext } from '../types/router';

export const MemoryPlugin: Plugin = {
  name: 'memory',
  run: async (input: string, context?: RouterContext) => {
    return { modifiedInput: `MemoryPlugin received: ${input}` };
  },
};
