import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeVosk: ModelInvocationHandler = async (input: string) => {
  const response = `Vosk recieved your input: ${input}`;

  return { model: MODEL_NAME['VOSK'], response };
};
