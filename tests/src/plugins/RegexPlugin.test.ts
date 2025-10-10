import { describe, it, expect } from 'vitest';
import { RegexPlugin } from '../../../src/plugins/RegexPlugin';
import { RouterContext } from '../../../src/types/router';

describe('RegexPlugin', () => {
  it('should extract text matching the regex pattern from context', async () => {
    const input = 'My email is test@example.com, please use it.';
    const context: RouterContext = {
      metadata: {
        regex: '\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b', // Email regex
      },
    };

    const { modifiedInput } = await RegexPlugin.run(input, context);

    expect(modifiedInput).toBe('test@example.com');
  });

  it('should return a "no match" message if the pattern does not match', async () => {
    const input = 'There is no email here.';
    const context: RouterContext = {
      metadata: {
        regex: '\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b',
      },
    };

    const { modifiedInput } = await RegexPlugin.run(input, context);

    expect(modifiedInput).toContain('No match found');
  });

  it('should return the original input if no regex is provided in context', async () => {
    const input = 'My email is test@example.com';
    const { modifiedInput } = await RegexPlugin.run(input, {}); // No context or metadata
    expect(modifiedInput).toBe(input);
  });
});
