import { Plugin } from '../core/PluginManager';
import { RouterContext } from '../types/router';

export const MemoryPlugin: Plugin = {
  name: 'memory',
  run: async (input: string, context?: RouterContext) => {
    const memory = context?.contributor?.memory;

    if (!memory || Object.keys(memory).length === 0) {
      // No memory to hydrate, return original input
      return { modifiedInput: input };
    }

    const memoryParts: string[] = [];
    if (memory.lastUsedPlugin) {
      memoryParts.push(`Last used plugin was '${memory.lastUsedPlugin}'.`);
    }
    if (memory.lastSchema) {
      memoryParts.push(`Last used schema was '${memory.lastSchema}'.`);
    }

    if (memoryParts.length > 0) {
      const memoryContext = `[Memory Context: ${memoryParts.join(' ')}]`;
      const modifiedInput = `${memoryContext}\nOriginal prompt: ${input}`;
      console.log(`[MemoryPlugin] Hydrated prompt with contributor memory.`);
      return { modifiedInput };
    }

    return { modifiedInput: input };
  },
};
