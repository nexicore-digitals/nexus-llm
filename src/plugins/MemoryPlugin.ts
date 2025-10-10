import { Plugin } from '../types/plugins';

export const MemoryPlugin: Plugin = {
  name: 'memory',
  run: async (input: string) => {
    return { modifiedInput: `MemoryPlugin received: ${input}` };
  },
};
