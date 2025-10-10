import { llmClient } from '../../../core/clients/llmClient';
import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeDeepSeekR1: ModelInvocationHandler = async (input: string) => {
  return llmClient.invoke(MODEL_NAME.DEEPSEEK_R1, input);
};
