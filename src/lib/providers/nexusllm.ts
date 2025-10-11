import { UseCase, USECASE_ROLE_MAP } from '../../types/models/model-usecase';
import { MODEL_CALLABLE_MAP, ModelName } from '../../types/models/models';
import { resolveModelByRoleAndUseCase } from '../../utils/models';

export async function invokeNexusLLM(
  useCase: UseCase = 'General text generation',
  input: string,
  options?: { model?: ModelName }
): Promise<{ model: ModelName; response: string }> {
  const role = USECASE_ROLE_MAP[useCase];
  // Prioritize the explicitly passed model (for fallbacks/overrides), otherwise resolve by role/use case.
  const preferredLLM = options?.model ?? resolveModelByRoleAndUseCase(role, useCase);
  const invokeLLM = MODEL_CALLABLE_MAP[preferredLLM];
  console.log('failing', preferredLLM, options?.model);
  if (!invokeLLM) {
    throw new Error(`No callable found for model: ${preferredLLM}`);
  }
  console.log(`[NexusLLM] Invoking ${preferredLLM} for ${useCase}`);
  return await invokeLLM(input, { metadata: { model: preferredLLM } });
}
