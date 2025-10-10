import { createLlmProvider } from '../../../constants/llm-provider-factory';

// import { GoogleGenAI } from '@google/genai';
// const ai = new GoogleGenAI({});

export const invokeGemma = createLlmProvider('Gemma-3-27B-IT');
