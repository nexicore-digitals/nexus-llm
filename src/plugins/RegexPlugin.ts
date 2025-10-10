import { Plugin } from '../types/plugins';

export const RegexPlugin: Plugin = {
  name: 'regex',
  run: async (input: string) => {
    return `RegexPlugin received: ${input}`;
  },
};
