import { MODEL_NAME } from '../../types/models';
import { ModelInvocationHandler } from '../../types/providers';

export const invokeDeepSeekR1: ModelInvocationHandler = async (input: string) => {
  const response = `DeepSeek R1 recieved your input: ${input}`;

  return { model: MODEL_NAME['DEEPSEEK_R1'], response };
};
