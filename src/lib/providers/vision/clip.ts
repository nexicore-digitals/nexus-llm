import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeClip: ModelInvocationHandler = async (input: string) => {
  const response = `CLIP Interrogator recieved your input: ${input}`;

  return { model: MODEL_NAME['CLIP'], response };
};
