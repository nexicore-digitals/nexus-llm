import { vi } from 'vitest';
import { NexusRouter } from '../../../src/core/NexusRouter';
import { invokeNexusLLM } from '../../../src/lib/providers/nexusllm';

vi.mock('../../../src/lib/providers/nexusllm');

const mockInvoke = vi.mocked(invokeNexusLLM);

describe('NexusRouter', () => {
  const router = new NexusRouter();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('routes input using provided useCase', async () => {
    mockInvoke.mockResolvedValue({
      model: 'Llama-3.3',
      response: 'Hello, world!',
    });

    const result = await router.route('Say hello', {
      useCase: 'General text generation',
    });

    expect(mockInvoke).toHaveBeenCalledWith('General text generation', 'Say hello');
    expect(result).toEqual({
      output: 'Hello, world',
      model: 'Llama-3.3',
    });
  });

  it('falls back to default useCase when none is provided', async () => {
    mockInvoke.mockResolvedValue({
      model: 'Llama-3.3',
      response: 'Default response',
    });

    const result = await router.route('Default test');

    expect(mockInvoke).toHaveBeenCalledWith('General text generation', 'Default test');
    expect(result.model).toBe('Llama-3.3');
    expect(result.output).toBe('Default response');
  });

  it('returns fallback response on error', async () => {
    mockInvoke.mockRejectedValue(new Error('Model failure'));

    const result = await router.route('Trigger error', {
      useCase: 'General text generation',
    });

    expect(result.output).toContain('An error occurred');
    expect(result.model).toBe('Llama-3.3'); // fallback model
  });
});
