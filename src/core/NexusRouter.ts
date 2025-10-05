import { getModelForUseCase } from '../constants/model-usecase';
import { invokeNexusLLM } from '../lib/providers/nexusllm';
import { LLMRouter, LLMResponse, RouterContext } from '../types/router';

export class NexusRouter implements LLMRouter {
  async route(input: string, context?: RouterContext): Promise<LLMResponse> {
    const useCase = context?.useCase ?? 'General text generation';
    let modelUsed = getModelForUseCase('General text generation')[0].name;
    try {
      const { model, response } = await invokeNexusLLM(useCase, input);
      modelUsed = model;
      console.log(`[NexusRouter] Routing "${useCase}" to NexusLLM`);
      return {
        output: response,
        model,
      };
    } catch (error: any) {
      const err: Error = error;
      console.error(`[NexusRouter] Error routing input:`, err.message);
      return {
        output: 'An error occurred while processing your request.',
        model: modelUsed,
      };
    }
  }
}
