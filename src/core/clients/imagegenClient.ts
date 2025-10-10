import { ModelName } from '../../types/models/models';

export const imagegenClient = {
  invoke: async (model: ModelName, input: string) => {
    console.log(`[imagegenClient] Invoking model: ${model}`);
    // In the future, this would contain the actual logic to call the image generation model.
    const response = `${model} received your input: ${input}`;
    return { model, response };
  },
};
