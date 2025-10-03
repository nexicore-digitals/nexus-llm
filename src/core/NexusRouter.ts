import { pluginRegistry } from '../plugins';
import { PluginName } from '../types/plugins';
import { LLMRouter, RouterContext, LLMResponse } from './router';

export class NexusRouter implements LLMRouter {
  async route(input: string, context?: RouterContext): Promise<LLMResponse> {
    const plugin = context?.plugin ? pluginRegistry[context.plugin as PluginName] : null;
    const output = plugin ? await plugin.run(input) : `No plugin matched. Echo: ${input}`;

    return {
      output,
      pluginUsed: context?.plugin || 'none',
    };
  }
}
