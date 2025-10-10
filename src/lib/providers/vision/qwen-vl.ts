import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeQwenVL: ModelInvocationHandler = async (input: string) => {
  const response = `Qwen2.5-VL recieved your input: ${input}`;

  return { model: MODEL_NAME['QWEN_2_5_VL'], response };
};
