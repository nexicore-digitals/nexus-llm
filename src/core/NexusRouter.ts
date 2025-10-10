import { invokeNexusLLM } from '../lib/providers/nexusllm';
import { USECASE_ROLE_MAP, UseCase } from '../types/models/model-usecase';
import { LLMRouter, LLMResponse } from '../types/router';
import { RouterContext } from '../types/router';
import { resolveModelByRoleAndUseCase } from '../utils/models';

export class NexusRouter implements LLMRouter {
  async route(input: string, context?: RouterContext): Promise<LLMResponse> {
    const useCase: UseCase = (context?.useCase as UseCase) ?? 'General text generation';
    const role = USECASE_ROLE_MAP[useCase as UseCase];
    let modelUsed = resolveModelByRoleAndUseCase(role, useCase);
    try {
      const { model, response } = await invokeNexusLLM(useCase, input);
      modelUsed = model;
      console.log(`[NexusRouter] Routing "${useCase}" to "${model}"`);
      return {
        output: response,
        model,
      };
    } catch (error: any) {
      const err: Error = error;
      console.error(`[NexusRouter] Error routing input: ${err.message}\nModel used: ${modelUsed}`);
      return {
        output: 'An error occurred while processing your request.',
        model: modelUsed,
      };
    }
  }
}
