import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NexusRouter } from '../../../src/core/NexusRouter';
import { invokeNexusLLM } from '../../../src/lib/providers/nexusllm';
import { PluginManager } from '../../../src/core/PluginManager';
import { resolveModelByRoleAndUseCase } from '../../../src/utils/models';

// Mock dependencies
vi.mock('../../../src/core/PluginManager');
vi.mock('../../../src/lib/providers/nexusllm', () => ({
  invokeNexusLLM: vi.fn(),
}));

describe('NexusRouter: Core Routing Logic', () => {
  let router: NexusRouter;
  let mockPluginManager: PluginManager;

  beforeEach(() => {
    vi.resetAllMocks();
    mockPluginManager = new PluginManager();
    router = new NexusRouter(mockPluginManager);
  });

  it('should route to the correct model without a plugin', async () => {
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'Qwen2.5',
      response: 'some llm response',
    });

    const result = await router.route('hello world', { useCase: 'General text generation' });

    expect(result.output).toHaveProperty('suggestion', 'some llm response');
    expect(result.model).toBe('Qwen2.5');
    expect(result.pluginsUsed).toEqual([]);
    expect(invokeNexusLLM).toHaveBeenCalledWith('General text generation', 'hello world', {
      model: 'Qwen2.5',
    });
  });

  it('should route to a different correct model for a different use case', async () => {
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'StarCoder2',
      response: 'some code response',
    });

    const result = await router.route('write a function', { useCase: 'Code generation' });

    expect(result.output).toHaveProperty('suggestion', 'some code response');
    expect(result.model).toBe('StarCoder2');
    expect(result.pluginsUsed).toEqual([]);
    expect(invokeNexusLLM).toHaveBeenCalledWith('Code generation', 'write a function', {
      model: 'StarCoder2',
    });
  });

  it('should route to the summarizer model for the summarization use case', async () => {
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'Gemma-3-27B-IT',
      response: 'this is a summary',
    });

    const result = await router.route('summarize this text', { useCase: 'Summarization' });

    expect(result.output).toHaveProperty('suggestion', 'this is a summary');
    expect(result.model).toBe('Gemma-3-27B-IT');
    expect(result.pluginsUsed).toEqual([]);
    expect(invokeNexusLLM).toHaveBeenCalledWith('Summarization', 'summarize this text', {
      model: 'Gemma-3-27B-IT',
    });
  });

  it('should route to the listener model for the speech-to-text use case', async () => {
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'Whisper Large-V3',
      response: 'this is a transcript',
    });

    const result = await router.route('path/to/audio.wav', { useCase: 'Speech-to-text (STT)' });

    expect(result.output).toHaveProperty('suggestion', 'this is a transcript');
    expect(result.model).toBe('Whisper Large-V3');
    expect(result.pluginsUsed).toEqual([]);
    expect(invokeNexusLLM).toHaveBeenCalledWith('Speech-to-text (STT)', 'path/to/audio.wav', {
      model: 'Whisper Large-V3',
    });
  });

  it('should route to the speaker model for the text-to-speech use case', async () => {
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'XTTS v2',
      response: 'path/to/generated.wav',
    });

    const result = await router.route('hello world', { useCase: 'Text-to-speech (TTS)' });

    expect(result.output).toHaveProperty('suggestion', 'path/to/generated.wav');
    expect(result.model).toBe('XTTS v2');
    expect(result.pluginsUsed).toEqual([]);
    expect(invokeNexusLLM).toHaveBeenCalledWith('Text-to-speech (TTS)', 'hello world', {
      model: 'XTTS v2',
    });
  });
});
