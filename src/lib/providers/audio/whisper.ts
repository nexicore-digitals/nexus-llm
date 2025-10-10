import { MODEL_NAME } from '../../../types/models/models';
import { ModelInvocationHandler } from '../../../types/providers';

export const invokeWhisperTiny: ModelInvocationHandler = async (input: string) => {
  const response = `Whisper Tiny recieved your input: ${input}`;

  return { model: MODEL_NAME['WHISPER_TINY'], response };
};

export const invokeWhisperBase: ModelInvocationHandler = async (input: string) => {
  const response = `Whisper Base recieved your input: ${input}`;

  return { model: MODEL_NAME['WHISPER_BASE'], response };
};

export const invokeWhisperSmall: ModelInvocationHandler = async (input: string) => {
  const response = `Whisper Small recieved your input: ${input}`;

  return { model: MODEL_NAME['WHISPER_SMALL'], response };
};

export const invokeWhisperLarge: ModelInvocationHandler = async (input: string) => {
  const response = `Whisper Large recieved your input: ${input}`;

  return { model: MODEL_NAME['WHISPER_LARGE_V3'], response };
};
