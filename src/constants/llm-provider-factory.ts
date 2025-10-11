import { llmClient } from '../core/clients/llmClient';
import { ModelName } from '../types/models/models';
import { ModelInvocationHandler } from '../types/providers';

/**
 * Creates a standard model invocation handler for a given model name.
 * This is a convenience factory for models that use the default `llmClient.invoke` method.
 */
export const createLlmProvider = (modelName: ModelName): ModelInvocationHandler => {
  return async (input: string) => {
    // Assuming llmClient.invoke returns the raw string response
    const { response } = await llmClient.invoke(modelName, input);
    return { model: modelName, response: response };
  };
};
