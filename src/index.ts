import { callLLM } from './core/llm';

export async function infer(prompt: string): Promise<string> {
  return await callLLM({ prompt });
}
