import { ModelName } from '../../types/models/models';

export const audioClient = {
  invoke: async (model: ModelName, input: string) => {
    console.log(`[audioClient] Invoking model: ${model}`);
    // In the future, this would contain the actual logic to call the audio model.
    const response = `${model} received your input: ${input}`;
    return { model, response };
  },
};
