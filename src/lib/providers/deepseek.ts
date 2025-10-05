import { MODEL_NAME } from '../../types/models';
import { ModelInvocationHandler } from '../../types/providers';

export const invokeDeepSeek: ModelInvocationHandler = async (input: string) => {
  const response = `DeepSeek recieved your input: ${input}`;

  return { model: MODEL_NAME['DEEPSEEK'], response };
};
