import { Plugin } from '../core/PluginManager';

export const DocPlugin: Plugin = {
  name: 'doc',
  run: async (input: string) => {
    return { modifiedInput: `DocPlugin received: ${input}` };
  },
};
