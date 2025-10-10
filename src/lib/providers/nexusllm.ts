import { UseCase, USECASE_ROLE_MAP } from '../../types/models/model-usecase';
import { MODEL_CALLABLE_MAP, ModelName } from '../../types/models/models';
import { resolveModelByRoleAndUseCase } from '../../utils/models';

export async function invokeNexusLLM(
  useCase: UseCase = 'General text generation',
  input: string
): Promise<{ model: ModelName; response: string }> {
  const role = USECASE_ROLE_MAP[useCase];
  const preferredLLM = resolveModelByRoleAndUseCase(role, useCase);
  const invokeLLM = MODEL_CALLABLE_MAP[preferredLLM];
  if (!invokeLLM) {
    throw new Error(`No callable found for model: ${preferredLLM}`);
  }
  console.log(`[NexusLLM] Invoking ${preferredLLM} for ${useCase}`);
  return await invokeLLM(input, { metadata: { model: preferredLLM } });
}
