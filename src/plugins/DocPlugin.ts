import { Plugin } from '../types/plugins';

export const DocPlugin: Plugin = {
  name: 'doc',
  run: async (input: string) => {
    return `DocPlugin received: ${input}`;
  },
};
