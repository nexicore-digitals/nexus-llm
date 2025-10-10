import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeSdxlTurbo: ModelInvocationHandler = async (input: string) => {
  const response = `SDXL Turbo recieved your input: ${input}`;

  return { model: MODEL_NAME['SDXL_TURBO'], response };
};
