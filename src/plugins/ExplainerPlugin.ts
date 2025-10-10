import { Plugin } from '../types/plugins';

export const ExplainerPlugin: Plugin = {
  name: 'explainer',
  run: async (input: string) => {
    return { modifiedInput: `ExplainerPlugin received: ${input}` };
  },
};
