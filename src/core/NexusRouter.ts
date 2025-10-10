import { invokeNexusLLM } from '../lib/providers/nexusllm';
import { USECASE_ROLE_MAP, UseCase } from '../types/models/model-usecase';
import { LLMRouter, LLMResponse } from '../types/router';
import { RouterContext } from '../types/router';
import { resolveModelByRoleAndUseCase } from '../utils/models';
import { PluginManager } from './PluginManager';
import { hasPremiumAccess } from '../utils/access';
import { FormatterPlugin } from '../plugins/FormatterPlugin';

export class NexusRouter implements LLMRouter {
  private pluginManager: PluginManager;

  constructor(pluginManager: PluginManager) {
    this.pluginManager = pluginManager;
    // Register the internal formatter plugin
    this.pluginManager.register(FormatterPlugin);
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

    // --- Contributor-aware Plugin Injection ---
    if (context?.contributor?.skillLevel === 'beginner') {
      // Ensure the plugins array exists on the context
      if (!context.plugins) {
        context.plugins = [];
      }
      // Add the explainer plugin if it's not already included
      if (!context.plugins.includes('explainer')) {
        context.plugins.push('explainer');
        console.log(`[NexusRouter] Beginner contributor detected. Injecting ExplainerPlugin.`);
      }
    }

    // --- Premium Access Gate for Plugins ---
    if (hasPremiumAccess(context)) {
      // --- Plugin Execution Step ---
      if (context?.plugins && Array.isArray(context.plugins)) {
        for (const pluginName of context.plugins) {
          const plugin = this.pluginManager.get(pluginName);
          if (plugin) {
            if (plugin.run) {
              console.log(`[NexusRouter] Executing pre-run for plugin: "${plugin.name}"`);
              const { modifiedInput } = await plugin.run(processedInput, context);
              processedInput = modifiedInput;
            }
            pluginsUsed.push(plugin.name); // Add to used list even if only postRun exists
          } else {
            console.warn(`[NexusRouter] Plugin "${pluginName}" not found. Skipping.`);
          }
        }
      }
    }

    // --- Response Object Initialization ---
    let finalResponse: LLMResponse = {
      output: 'An error occurred while processing your request.', // Default error message
      model: modelUsed, // The model we intend to use
      pluginsUsed,
    };

    try {
      const { model, response } = await invokeNexusLLM(useCase, processedInput);
      console.log(`[NexusRouter] Routing "${useCase}" to "${model}"`);

      // Update the response object on success
      finalResponse = {
        ...finalResponse,
        output: response,
        model, // Use the actual model returned by the provider
      };
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(
        `[NexusRouter] Error routing input for use case "${useCase}". Intended model: "${modelUsed}".`
      );
      console.error(error); // Log the full error object for stack trace
      // Add the error to the response object
      finalResponse.error = errorMessage;
    }

    // --- Initial Formatting Step ---
    // Ensure the output is structured before other post-run plugins operate on it.
    finalResponse = await FormatterPlugin.postRun!(finalResponse, context);

    // --- Post-processing Plugin Execution (runs for both success and error) ---
    if (hasPremiumAccess(context)) {
      for (const pluginName of pluginsUsed) {
        const plugin = this.pluginManager.get(pluginName);
        if (plugin?.postRun) {
          console.log(`[NexusRouter] Executing post-run for plugin: "${plugin.name}"`);
          finalResponse = await plugin.postRun(finalResponse, context);
        }
      }
    }
    return finalResponse;
  }
}
