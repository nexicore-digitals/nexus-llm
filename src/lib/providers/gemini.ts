import { GoogleGenAI } from '@google/genai';
import { MODEL_NAME } from '../../types/models';
import { ModelInvocationHandler } from '../../types/providers';
const ai = new GoogleGenAI({});

export const invokeGemini: ModelInvocationHandler = async (input: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: input,
  });

  return { model: MODEL_NAME['GEMINI_FLASH_2_5'], response: response.text ?? '' };
};
