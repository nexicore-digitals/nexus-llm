import { visionClient } from '../../../core/clients/visionClient';
import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeClip: ModelInvocationHandler = async (input: string) => {
  return visionClient.invoke(MODEL_NAME.CLIP, input);
};
