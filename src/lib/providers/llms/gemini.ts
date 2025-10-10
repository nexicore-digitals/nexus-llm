import { createLlmProvider } from '../../../constants/llm-provider-factory';

// import { GoogleGenAI } from '@google/genai';
// const ai = new GoogleGenAI({});

export const invokeGemini = createLlmProvider('Gemini Flash 2.5');
