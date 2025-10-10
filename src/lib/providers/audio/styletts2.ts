import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeStyleTTS2: ModelInvocationHandler = async (input: string) => {
  const response = `StyleTTS2 recieved your input: ${input}`;

  return { model: MODEL_NAME['STYLETTS2'], response };
};
