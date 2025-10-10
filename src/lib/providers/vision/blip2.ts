import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeBlip2: ModelInvocationHandler = async (input: string) => {
  const response = `BLIP-2 recieved your input: ${input}`;

  return { model: MODEL_NAME['BLIP_2'], response };
};
