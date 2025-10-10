import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeStarCoder2: ModelInvocationHandler = async (input: string) => {
  const response = `StarCoder2 recieved your input: ${input}`;

  return { model: MODEL_NAME['STARCODER_2'], response };
};
