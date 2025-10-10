import { Plugin } from '../types/plugins';
import { RouterContext } from '../types/router';

export const RegexPlugin: Plugin = {
  name: 'regex',
  run: async (input: string, context?: RouterContext) => {
    const regexPattern = context?.metadata?.regex;

    if (!regexPattern) {
      console.warn('[RegexPlugin] No regex pattern found in context.metadata. Skipping.');
      return { modifiedInput: input };
    }

    try {
      const regex = new RegExp(regexPattern);
      const match = input.match(regex);
      return { modifiedInput: match ? match[0] : `No match found for pattern: ${regexPattern}` };
    } catch (error) {
      return { modifiedInput: `Invalid regex pattern provided: ${regexPattern}` };
    }
  },
};
