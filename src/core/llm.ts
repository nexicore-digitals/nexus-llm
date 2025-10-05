import { NexusRouter } from './NexusRouter';

const router = new NexusRouter();

export async function callLLM({ prompt }: { prompt: string }): Promise<string> {
  const response = await router.route(prompt);
  return response.output;
}
