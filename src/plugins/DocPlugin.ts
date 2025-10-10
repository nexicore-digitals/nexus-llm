import { Plugin } from '../core/PluginManager';
import { RouterContext } from '../types/router';

export const DocPlugin: Plugin = {
  name: 'doc',
  run: async (input: string, context?: RouterContext) => {
    return { modifiedInput: `DocPlugin received: ${input}` };
  },
};
