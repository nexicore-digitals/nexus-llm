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
    let modelUsed = resolveModelByRoleAndUseCase(role, useCase);
    let processedInput = input;
    let pluginUsed: string | undefined;

    // --- Plugin Execution Step ---
    if (context?.plugin) {
      const plugin = this.pluginManager.get(context.plugin);
      if (plugin) {
        pluginUsed = plugin.name;
        const { modifiedInput } = await plugin.run(input);
        processedInput = modifiedInput;
        console.log(`[NexusRouter] Plugin "${plugin.name}" processed the input.`);
      }
    }

    try {
      const { model, response } = await invokeNexusLLM(useCase, processedInput);
      modelUsed = model;
      console.log(`[NexusRouter] Routing "${useCase}" to "${model}"`);
      return {
        output: response,
        model,
        pluginUsed,
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
        pluginUsed,
      };
    }
  }
}
