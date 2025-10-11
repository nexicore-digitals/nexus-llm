import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NexusRouter } from '../../../src/core/NexusRouter';
import { invokeNexusLLM } from '../../../src/lib/providers/nexusllm';
import { Plugin, PluginManager } from '../../../src/core/PluginManager';
import { RouterContext } from '../../../src/types/router';
import { Contributor } from '../../../src/types/contributor';

import { PluginName } from '../../../src/types/plugins';
// Mock dependencies
vi.mock('../../../src/core/PluginManager');
vi.mock('../../../src/lib/providers/nexusllm', () => ({
  invokeNexusLLM: vi.fn(),
}));

describe('NexusRouter: Plugin Execution', () => {
  let router: NexusRouter;
  let mockPluginManager: PluginManager;

  beforeEach(() => {
    vi.resetAllMocks();
    mockPluginManager = new PluginManager();
    router = new NexusRouter(mockPluginManager);
  });

  it('should execute a single plugin for a contributor with premium access', async () => {
    // 1. Mock the LLM call
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'StarCoder2',
      response: 'some llm response',
    });

    // 2. Setup mock plugin
    const mockPlugin: Plugin = {
      name: 'regex',
      run: vi.fn().mockResolvedValue({ modifiedInput: 'MODIFIED: hello world' }),
    };
    vi.spyOn(mockPluginManager, 'get').mockReturnValue(mockPlugin);

    // 3. Setup context with premium access and a plugin request
    const premiumContributor: Contributor = {
      id: 'premium-user',
      secretBadge: true,
    };
    const context: RouterContext = {
      useCase: 'Code generation',
      plugins: ['regex'],
      contributor: premiumContributor,
    };

    // 4. Call the router
    const result = await router.route('hello world', context);

    // 5. Assertions
    expect(mockPluginManager.get).toHaveBeenCalledWith('regex');
    expect(mockPlugin.run).toHaveBeenCalledWith('hello world', context);
    expect(invokeNexusLLM).toHaveBeenCalledWith('Code generation', 'MODIFIED: hello world', {
      model: 'StarCoder2',
    });
    expect(result.pluginsUsed).toEqual(['regex']);
    expect(result.output).toHaveProperty('suggestion', 'some llm response');
  });

  it('should NOT execute plugins for a contributor without premium access', async () => {
    // 1. Mock the LLM call
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'StarCoder2',
      response: 'some llm response',
    });

    // 2. Setup mock plugin
    const mockPlugin: Plugin = {
      name: 'regex',
      run: vi.fn(), // We only need to check if this is called
    };
    vi.spyOn(mockPluginManager, 'get').mockReturnValue(mockPlugin);

    // 3. Setup context with a non-premium contributor
    const nonPremiumContributor: Contributor = {
      id: 'non-premium-user',
      secretBadge: false, // Explicitly not premium
    };
    const context: RouterContext = {
      useCase: 'Code generation',
      plugins: ['regex'],
      contributor: nonPremiumContributor,
    };

    // 4. Call the router and assert that the plugin was not run
    const result = await router.route('hello world', context);
    expect(mockPlugin.run).not.toHaveBeenCalled();
    expect(result.pluginsUsed).toEqual([]);
  });

  it('should handle a non-existent plugin gracefully', async () => {
    // 1. Mock the LLM call
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'StarCoder2',
      response: 'some llm response',
    });

    // 2. Setup PluginManager to return undefined for the requested plugin
    vi.spyOn(mockPluginManager, 'get').mockReturnValue(undefined);

    // 3. Setup context with premium access
    const premiumContributor: Contributor = {
      id: 'premium-user',
      secretBadge: true,
    };
    const context: RouterContext = {
      useCase: 'Code generation',
      plugins: ['non-existent-plugin'],
      contributor: premiumContributor,
    };

    // 4. Call the router and assert that it doesn't crash and skips the plugin
    const result = await router.route('hello world', context);

    expect(mockPluginManager.get).toHaveBeenCalledWith('non-existent-plugin');
    expect(result.pluginsUsed).toEqual([]);
    // Verify the LLM was still called with the original input
    expect(invokeNexusLLM).toHaveBeenCalledWith('Code generation', 'hello world', {
      model: 'StarCoder2',
    });
  });

  it('should execute the postRun method of a plugin after the LLM call', async () => {
    // 1. Mock the LLM call
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'StarCoder2',
      response: 'some llm response',
    });

    // 2. Setup a plugin with a postRun method
    const mockPostRunPlugin: Plugin = {
      name: 'explainer' as PluginName, // Using a valid name from the enum
      postRun: vi.fn().mockImplementation(async response => {
        const suggestion = (response.output as any).suggestion;
        return {
          ...response,
          output: {
            ...(response.output as any),
            suggestion: `${suggestion} - modified by postRun`,
          },
        };
      }),
    };
    vi.spyOn(mockPluginManager, 'get').mockReturnValue(mockPostRunPlugin);

    // 3. Setup context with premium access
    const premiumContributor: Contributor = {
      id: 'premium-user-postrun',
      secretBadge: true,
    };
    const context: RouterContext = {
      useCase: 'Code generation',
      plugins: ['explainer'],
      contributor: premiumContributor,
    };

    // 4. Call the router
    const result = await router.route('some input', context);

    // 5. Assertions
    expect(invokeNexusLLM).toHaveBeenCalledWith('Code generation', 'some input', {
      model: 'StarCoder2',
    });
    expect(mockPostRunPlugin.postRun).toHaveBeenCalled();
    expect(result.output).toHaveProperty('suggestion', 'some llm response - modified by postRun');
  });

  it('should execute a chain of plugins in order', async () => {
    // 1. Mock the LLM call
    vi.mocked(invokeNexusLLM).mockResolvedValue({
      model: 'StarCoder2',
      response: 'some llm response',
    });

    // 2. Setup mock plugins
    const plugin1: Plugin = {
      name: 'memory' as PluginName,
      run: vi.fn().mockResolvedValue({ modifiedInput: 'output from plugin1' }),
    };
    const plugin2: Plugin = {
      name: 'doc' as PluginName,
      run: vi.fn().mockResolvedValue({ modifiedInput: 'output from plugin2' }),
    };

    // 3. Setup PluginManager to return the correct plugin for each call
    const getSpy = vi.spyOn(mockPluginManager, 'get');
    getSpy.mockImplementation(pluginName => {
      if (pluginName === 'memory') return plugin1;
      if (pluginName === 'doc') return plugin2;
      return undefined;
    });

    // 4. Setup context with premium access and a plugin chain
    const context: RouterContext = {
      useCase: 'Code generation',
      plugins: ['memory', 'doc'],
      model: 'StarCoder2',
      contributor: {
        id: 'premium-user-chain',
        secretBadge: true,
      },
    };

    // 5. Call the router
    const result = await router.route('initial input', context);

    // 6. Assertions
    expect(plugin1.run).toHaveBeenCalledWith('initial input', context);
    expect(plugin2.run).toHaveBeenCalledWith('output from plugin1', context);
    expect(invokeNexusLLM).toHaveBeenCalledWith('Code generation', 'output from plugin2', {
      model: 'StarCoder2',
    });
    expect(result.pluginsUsed).toEqual(['memory', 'doc']);
  });
});
