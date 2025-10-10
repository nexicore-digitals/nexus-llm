import { Plugin } from '../core/PluginManager';

export const MemoryPlugin: Plugin = {
  name: 'memory',
  run: async (input: string) => {
    return { modifiedInput: `MemoryPlugin received: ${input}` };
  },
};
