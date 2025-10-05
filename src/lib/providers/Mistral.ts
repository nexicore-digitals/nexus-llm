import { MODEL_NAME } from '../../types/models';
import { ModelInvocationHandler } from '../../types/providers';

export const invokeMistral: ModelInvocationHandler = async (input: string) => {
  const response = `Mistral recieved your input: ${input}`;

  return { model: MODEL_NAME['MISTRAL'], response };
};
