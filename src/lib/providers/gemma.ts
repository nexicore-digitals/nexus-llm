import { GoogleGenAI } from '@google/genai';
import { MODEL_NAME } from '../../types/models';
import { ModelInvocationHandler } from '../../types/providers';
const ai = new GoogleGenAI({});

export const invokeGemma: ModelInvocationHandler = async (input: string) => {
  const response = await ai.models.generateContent({
    model: 'gemma-3-27b-it',
    contents: input,
  });

  return { model: MODEL_NAME['GEMINI_FLASH_2_5'], response: response.text ?? '' };
};
