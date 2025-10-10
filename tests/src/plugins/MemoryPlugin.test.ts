import { describe, it, expect } from 'vitest';
import { MemoryPlugin } from '../../../src/plugins/MemoryPlugin';
import { RouterContext } from '../../../src/types/router';
import { Contributor } from '../../../src/types/contributor';

describe('MemoryPlugin', () => {
  it('should prepend contributor memory to the input', async () => {
    const contributor: Contributor = {
      id: 'user-with-memory',
      memory: {
        lastUsedPlugin: 'regex',
        lastSchema: 'NexusDSM.v1',
      },
    };
    const context: RouterContext = { contributor };
    const input = 'fix this please';

    const { modifiedInput } = await MemoryPlugin.run!(input, context);

    expect(modifiedInput).toContain(
      "[Memory Context: Last used plugin was 'regex'. Last used schema was 'NexusDSM.v1'.]"
    );
    expect(modifiedInput).toContain('Original prompt: fix this please');
  });

  it('should return the original input if contributor has no memory', async () => {
    const contributor: Contributor = {
      id: 'user-without-memory',
      // No memory property
    };
    const context: RouterContext = { contributor };
    const input = 'fix this please';

    const { modifiedInput } = await MemoryPlugin.run!(input, context);

    expect(modifiedInput).toBe(input);
  });

  it('should return the original input if context is not provided', async () => {
    const input = 'fix this please';
    const { modifiedInput } = await MemoryPlugin.run!(input, undefined);
    expect(modifiedInput).toBe(input);
  });
});
