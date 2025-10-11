import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NexusRouter } from '../../../src/core/NexusRouter';
import { invokeNexusLLM } from '../../../src/lib/providers/nexusllm';
import { Plugin, PluginManager } from '../../../src/core/PluginManager';
import { RouterContext } from '../../../src/types/router';
import { Contributor } from '../../../src/types/contributor';
import { MemoryPlugin } from '../../../src/plugins/MemoryPlugin';

// Mock dependencies
vi.mock('../../../src/core/PluginManager');
vi.mock('../../../src/lib/providers/nexusllm', () => ({
  invokeNexusLLM: vi.fn(),
}));

describe('NexusRouter: Personalization', () => {
  let router: NexusRouter;
  let mockPluginManager: PluginManager;

  beforeEach(() => {
    vi.resetAllMocks();
    mockPluginManager = new PluginManager();
    router = new NexusRouter(mockPluginManager);
  });

  it("should use the contributor's preferred model if provided", async () => {
    // 1. Setup a contributor with a preferred model
    const contributor: Contributor = {
      id: 'test-user',
      preferredModel: 'Gemma-3-27B-IT',
    };

    const context: RouterContext = {
      useCase: 'Code generation', // This would normally resolve to 'StarCoder2'
      contributor: contributor,
    };

    // 2. Mock an error to inspect the 'modelUsed' in the catch block
    const mockError = new Error('LLM invocation failed');
    vi.mocked(invokeNexusLLM).mockRejectedValue(mockError);

    // 3. Call the router
    const result = await router.route('hello world', context);

    // 4. Assert that the router's response uses the contributor's preferred model
    expect(result.model).toBe('Gemma-3-27B-IT');
    expect(result.error).toBe('LLM invocation failed');
  });

  it('should automatically add the ExplainerPlugin for beginner contributors', async () => {
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'Qwen2.5',
      response: 'some llm response',
    });

    // 1. Setup a beginner contributor with premium access
    const contributor: Contributor = {
      id: 'beginner-user',
      skillLevel: 'beginner',
      secretBadge: true,
    };
    const context: RouterContext = {
      useCase: 'General text generation',
      contributor: contributor,
    };

    // 2. Setup mock for ExplainerPlugin
    const explainerPlugin: Plugin = {
      name: 'explainer',
      run: vi.fn().mockResolvedValue({ modifiedInput: 'explained input' }),
    };
    vi.spyOn(mockPluginManager, 'get').mockImplementation(pluginName => {
      if (pluginName === 'explainer') return explainerPlugin;
      return undefined;
    });

    // 3. Call the router
    const result = await router.route('some input', context);

    // 4. Assertions
    expect(mockPluginManager.get).toHaveBeenCalledWith('explainer');
    expect(explainerPlugin.run).toHaveBeenCalledWith('some input', context);
    expect(result.pluginsUsed).toContain('explainer');
    // This assertion will now fail because the router resolves a different model
    expect(invokeNexusLLM).toHaveBeenCalledWith('General text generation', 'explained input', {
      model: 'Qwen2.5',
    });
  });

  it('should use the MemoryPlugin to hydrate the prompt before calling the LLM', async () => {
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'Qwen2.5',
      response: 'some llm response',
    });

    // 1. Setup: Use the real MemoryPlugin logic
    vi.spyOn(mockPluginManager, 'get').mockImplementation(pluginName => {
      if (pluginName === 'memory') return MemoryPlugin;
      return undefined;
    });

    // 2. Define a contributor with memory and premium access
    const contributor: Contributor = {
      id: 'user-with-memory',
      secretBadge: true,
      memory: {
        lastUsedPlugin: 'regex',
        lastSchema: 'NexusDSM.v1',
      },
    };
    const context: RouterContext = {
      useCase: 'General text generation',
      plugins: ['memory'],
      contributor,
    };

    // 3. Call the router
    await router.route('fix this please', context);

    // 4. Assert that the LLM was called with the hydrated prompt
    expect(invokeNexusLLM).toHaveBeenCalledWith(
      'General text generation',
      "[Memory Context: Last used plugin was 'regex'. Last used schema was 'NexusDSM.v1'.]\nOriginal prompt: fix this please",
      { model: 'Qwen2.5' }
    );
  });
});
