import { MODEL_NAME } from '../../types/models';
import { ModelInvocationHandler } from '../../types/providers';

export const invokeDeepSeekV3: ModelInvocationHandler = async (input: string) => {
  const response = `DeepSeek v3 recieved your input: ${input}`;

  return { model: MODEL_NAME['DEEPSEEK'], response };
};
