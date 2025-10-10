import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeBark: ModelInvocationHandler = async (input: string) => {
  const response = `Bark recieved your input: ${input}`;

  return { model: MODEL_NAME['BARK'], response };
};
