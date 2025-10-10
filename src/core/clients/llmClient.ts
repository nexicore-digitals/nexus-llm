import { ModelName } from '../../types/models/models';

export const llmClient = {
  invoke: async (model: ModelName, input: string) => {
    console.log(`[llmClient] Invoking model: ${model}`);
    // In the future, this would contain the actual logic to call the LLM
    // (e.g., using a local inference server or a cloud-based API).
    const response = `${model} received your input: ${input}`;
    return { model, response };
  },
};
