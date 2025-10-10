import { ModelName } from '../../types/models/models';

export const visionClient = {
  invoke: async (model: ModelName, input: string) => {
    console.log(`[visionClient] Invoking model: ${model}`);
    // In the future, this would contain the actual logic to call the vision model.
    const response = `${model} received your input: ${input}`;
    return { model, response };
  },
};
