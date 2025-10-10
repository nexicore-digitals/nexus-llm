import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NexusRouter } from '../../../src/core/NexusRouter';
import { invokeNexusLLM } from '../../../src/lib/providers/nexusllm';
import { Plugin, PluginManager } from '../../../src/core/PluginManager';
import { LLMResponse, RouterContext } from '../../../src/types/router';
import { Contributor } from '../../../src/types/contributor';
import { PluginName } from '../../../src/types/plugins';

// Mock dependencies
vi.mock('../../../src/core/PluginManager');
vi.mock('../../../src/lib/providers/nexusllm', () => ({
  invokeNexusLLM: vi.fn(),
}));

describe('NexusRouter', () => {
  let router: NexusRouter;
  let mockPluginManager: PluginManager;

  beforeEach(() => {
    vi.resetAllMocks();

    // Create a new mock instance of PluginManager for each test
    mockPluginManager = new PluginManager();
    router = new NexusRouter(mockPluginManager);

    // Default successful response for invokeNexusLLM
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'StarCoder2',
      response: 'some llm response',
    });
  });

  it('should route to the correct model without a plugin', async () => {
    const result = await router.route('hello world', { useCase: 'Code generation' });

    expect(result.output).toBe('some llm response');
    expect(result.model).toBe('StarCoder2');
    expect(result.pluginsUsed).toEqual([]);
    expect(invokeNexusLLM).toHaveBeenCalledWith('Code generation', 'hello world');
  });

  it('should execute a single plugin if specified in the context', async () => {
    const mockPlugin: Plugin = {
      name: 'regex',
      run: vi.fn().mockResolvedValue({ modifiedInput: 'MODIFIED: hello world' }),
    };
    vi.spyOn(mockPluginManager, 'get').mockReturnValue(mockPlugin);

    const context: RouterContext = {
      useCase: 'Code generation',
      plugins: ['regex'],
    };

    const result = await router.route('hello world', context);

    expect(mockPluginManager.get).toHaveBeenCalledWith('regex');
    expect(mockPlugin.run).toHaveBeenCalledWith('hello world', context);
    expect(invokeNexusLLM).toHaveBeenCalledWith('Code generation', 'MODIFIED: hello world');
    expect(result.pluginsUsed).toEqual(['regex']);
    expect(result.output).toBe('some llm response');
  });

  it('should not execute a plugin if requested plugin is not found', async () => {
    vi.spyOn(mockPluginManager, 'get').mockReturnValue(undefined);

    const context: RouterContext = {
      useCase: 'Code generation',
      plugins: ['non-existent-plugin'],
    };

    const result = await router.route('hello world', context);

    expect(mockPluginManager.get).toHaveBeenCalledWith('non-existent-plugin');
    expect(invokeNexusLLM).toHaveBeenCalledWith('Code generation', 'hello world');
    expect(result.pluginsUsed).toEqual([]);
  });

  it('should execute a chain of plugins in order', async () => {
    // 1. Setup mock plugins
    const plugin1: Plugin = {
      name: 'memory' as PluginName, // Cast to PluginName
      run: vi.fn().mockResolvedValue({ modifiedInput: 'output from plugin1' }),
    };
    const plugin2: Plugin = {
      name: 'doc' as PluginName, // Cast to PluginName
      run: vi.fn().mockResolvedValue({ modifiedInput: 'output from plugin2' }),
    };

    // 2. Setup PluginManager mock to return the correct plugin for each call
    const getSpy = vi.spyOn(mockPluginManager, 'get');
    getSpy.mockImplementation(pluginName => {
      if (pluginName === 'plugin1') return plugin1;
      if (pluginName === 'doc') return plugin2;
      return undefined; // Return undefined for unknown plugin names
    });

    // 3. Define context to trigger the plugin chain
    const context: RouterContext = {
      useCase: 'Code generation',
      plugins: ['plugin1', 'plugin2'],
    };
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
    // The default for 'Code generation' is 'StarCoder2', but it should be overridden.
    expect(result.model).toBe('Gemma-3-27B-IT');
    expect(result.error).toBe('LLM invocation failed');
  });

  it('should automatically add the ExplainerPlugin for beginner contributors', async () => {
    // 1. Setup a beginner contributor
    const contributor: Contributor = {
      id: 'beginner-user',
      skillLevel: 'beginner',
    };

    const context: RouterContext = {
      useCase: 'General text generation',
      contributor: contributor,
      // No plugins initially specified
    };

    // 2. Setup mock for ExplainerPlugin
    const explainerPlugin: Plugin = {
      name: 'explainer',
      run: vi.fn().mockResolvedValue({ modifiedInput: 'explained input' }),
    };
    vi.spyOn(mockPluginManager, 'get').mockImplementation(pluginName => {
      if (pluginName === 'explainer') {
        return explainerPlugin;
      }
      return undefined;
    });

    // 3. Call the router
    const result = await router.route('some input', context);

    // 4. Assertions
    expect(mockPluginManager.get).toHaveBeenCalledWith('explainer');
    expect(explainerPlugin.run).toHaveBeenCalledWith('some input', context);
    expect(result.pluginsUsed).toContain('explainer');
    expect(invokeNexusLLM).toHaveBeenCalledWith('General text generation', 'explained input');
  });

  it('should execute postRun method of a plugin after the LLM call', async () => {
    // 1. Setup a plugin with a postRun method
    const mockPostRunPlugin: Plugin = {
      name: 'post-processor' as PluginName,
      postRun: vi.fn().mockImplementation(async (response: LLMResponse) => {
        return {
          ...response,
          output: `${response.output} - modified by postRun`,
        };
      }),
    };
    vi.spyOn(mockPluginManager, 'get').mockReturnValue(mockPostRunPlugin);

    const context: RouterContext = {
      useCase: 'General text generation',
      plugins: ['post-processor'],
    };

    // 2. Call the router
    const result = await router.route('some input', context);

    // 3. Assertions
    // Check that the LLM was called first
    expect(invokeNexusLLM).toHaveBeenCalledWith('General text generation', 'some input');

    // Check that postRun was called with the initial LLM response
    expect(mockPostRunPlugin.postRun).toHaveBeenCalledWith(
      expect.objectContaining({ output: 'some llm response' }),
      context
    );

    // Check that the final output is the one modified by postRun
    expect(result.output).toBe('some llm response - modified by postRun');
    expect(result.pluginsUsed).toContain('post-processor');
  });
});
