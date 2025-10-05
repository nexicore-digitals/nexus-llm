import { MODEL_NAME } from '../../types/models';
import { ModelInvocationHandler } from '../../types/providers';

export const invokeCommandRPlus: ModelInvocationHandler = async (input: string) => {
  const response = `Command-r-plus recieved your input: ${input}`;

  return { model: MODEL_NAME['COMMAND_R_PLUS'], response };
};
