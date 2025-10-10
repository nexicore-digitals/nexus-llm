import { invokeNexusLLM } from '../lib/providers/nexusllm';
import { USECASE_ROLE_MAP, UseCase } from '../types/models/model-usecase';
import { LLMRouter, LLMResponse } from '../types/router';
import { RouterContext } from '../types/router';
import { resolveModelByRoleAndUseCase } from '../utils/models';
import { PluginManager } from './PluginManager';

export class NexusRouter implements LLMRouter {
  private pluginManager: PluginManager;

  constructor(pluginManager: PluginManager) {
    this.pluginManager = pluginManager;
  }

  async route(input: string, context?: RouterContext): Promise<LLMResponse> {
    const useCase: UseCase = (context?.useCase as UseCase) ?? 'General text generation';
    const role = USECASE_ROLE_MAP[useCase as UseCase];
    // --- Contributor-aware Model Selection ---
    // Use contributor's preferred model if available, otherwise resolve by role.
    let modelUsed =
      context?.contributor?.preferredModel ?? resolveModelByRoleAndUseCase(role, useCase);

    let processedInput = input;
    const pluginsUsed: string[] = [];

    // --- Plugin Execution Step ---
    if (context?.plugins && Array.isArray(context.plugins)) {
      for (const pluginName of context.plugins) {
        const plugin = this.pluginManager.get(pluginName);
        if (plugin) {
          console.log(`[NexusRouter] Executing plugin: "${plugin.name}"`);
          const { modifiedInput } = await plugin.run(processedInput, context);
          processedInput = modifiedInput;
          pluginsUsed.push(plugin.name);
        } else {
          console.warn(`[NexusRouter] Plugin "${pluginName}" not found. Skipping.`);
        }
      }
    }

    try {
      const { model, response } = await invokeNexusLLM(useCase, processedInput);
      modelUsed = model;
      console.log(`[NexusRouter] Routing "${useCase}" to "${model}"`);
      return {
        output: response,
        model,
        pluginsUsed,
      };
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(
        `[NexusRouter] Error routing input for use case "${useCase}". Intended model: "${modelUsed}".`
      );
      console.error(error); // Log the full error object for stack trace
      return {
        output: 'An error occurred while processing your request.',
        model: modelUsed,
        error: errorMessage,
        pluginsUsed,
      };
    }
  }
}
