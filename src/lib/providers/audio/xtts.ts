import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeXtts: ModelInvocationHandler = async (input: string) => {
  const response = `XTTS v2 recieved your input: ${input}`;

  return { model: MODEL_NAME['XTTS_V2'], response };
};
