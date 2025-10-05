import { MODEL_NAME } from '../../types/models';
import { ModelInvocationHandler } from '../../types/providers';

export const invokePhi: ModelInvocationHandler = async (input: string) => {
  const response = `Phi-4 recieved your input: ${input}`;

  return { model: MODEL_NAME['PHI_4'], response };
};
