import { ModelInvocationHandler } from '../../../types/providers';
import { MODEL_NAME } from '../../../types/models/models';
import Groq from 'groq-sdk';
import { config } from 'dotenv';
config();

const apiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey });

export const invokeLlama: ModelInvocationHandler = async (input: string) => {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'user',
        content: input,
      },
    ],
  });

  const response = completion?.choices[0]?.message?.content ?? '';

  return { model: MODEL_NAME['LLAMA_3'], response };
};
