import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeCoquiSTT: ModelInvocationHandler = async (input: string) => {
  const response = `Coqui STT recieved your input: ${input}`;

  return { model: MODEL_NAME['COQUI_STT'], response };
};
