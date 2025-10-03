export async function callLLM({ prompt }: { prompt: string }): Promise<string> {
  // Replace with LiteLLM, OpenRouter, or mock
  return `Echo: ${prompt}`;
}
