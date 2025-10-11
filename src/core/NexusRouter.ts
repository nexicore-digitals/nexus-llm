import { invokeNexusLLM } from '../lib/providers/nexusllm';
import { USECASE_ROLE_MAP, UseCase } from '../types/models/model-usecase';
import { LLMRouter, LLMResponse } from '../types/router';
import { RouterContext } from '../types/router';
import { resolveModelByRoleAndUseCase } from '../utils/models';
import { PluginManager } from './PluginManager';
import { hasPremiumAccess } from '../utils/access';
import { getModelForRole } from '../utils/models';
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
    console.log(`[NexusRouter] Selected model: "${modelUsed}" for use case "${useCase}"`);

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
      const { model, response } = await invokeNexusLLM(useCase, processedInput, {
        model: modelUsed,
      });
      console.log(`[NexusRouter] Routing "${useCase}" to "${model}"`);

      // Update the response object on success
      finalResponse = {
        ...finalResponse,
        output: {
          suggestion: response,
          confidence: 0.95, // Default confidence for successful responses
        },
        model, // Use the actual model returned by the provider
      };
    } catch (initialError: any) {
      console.error(`[NexusRouter] Initial model invocation failed for "${modelUsed}".`);

      // --- Fallback Orchestration (Premium Feature) ---
      if (hasPremiumAccess(context)) {
        const fallbackModel = getModelForRole(role, 1); // Get the second-best model
        if (fallbackModel) {
          console.log(`[NexusRouter] Attempting fallback to model: "${fallbackModel}"`);
          try {
            const { model, response } = await invokeNexusLLM(useCase, processedInput, {
              model: fallbackModel,
            });
            finalResponse.output = response;
            finalResponse.model = model;
            finalResponse.fallbackModel = modelUsed; // Record that a fallback occurred
            initialError = null; // Clear the error as fallback was successful
          } catch (fallbackError: any) {
            console.error(`[NexusRouter] Fallback model "${fallbackModel}" also failed.`);
          }
        }
      }

      if (initialError) {
        finalResponse.error = initialError.message;
      }
    }

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

    // --- Final Formatting Step ---
    // This should be the last step to ensure all modifications are captured.
    const fullyProcessedResponse = await FormatterPlugin.postRun!(finalResponse, context);
    return fullyProcessedResponse;
  }
}
