import { describe, it, expect, vi, beforeEach } from 'vitest';
import { invokeNexusLLM } from '../../../src/lib/providers/nexusllm';
import { NexusRouter } from '../../../src/core/NexusRouter';
import { PluginManager } from '../../../src/core/PluginManager';
import { LLMResponse, RouterContext } from '../../../src/types/router';
import { Plugin } from '../../../src/types/plugins';

// Mock dependencies
vi.mock('../../../src/lib/providers/nexusllm');
vi.mock('../../../src/core/PluginManager');

describe('NexusRouter', () => {
  let router: NexusRouter;
  let mockPluginManager: PluginManager;
  const mockInvokeNexusLLM = vi.mocked(invokeNexusLLM);

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();

    // Create a new mock instance of PluginManager for each test
    mockPluginManager = new (vi.mocked(PluginManager))();
    router = new NexusRouter(mockPluginManager);

    // Default successful response for invokeNexusLLM
    mockInvokeNexusLLM.mockResolvedValue({
      model: 'StarCoder2',
      response: 'some llm response',
    });
  });

  it('should route to the correct model without a plugin', async () => {
    const result: LLMResponse = await router.route('hello world', { useCase: 'Code generation' });

    expect(result.output).toBe('some llm response');
    expect(result.model).toBe('StarCoder2');
    expect(result.pluginUsed).toBeUndefined();
    expect(mockInvokeNexusLLM).toHaveBeenCalledWith('Code generation', 'hello world');
  });

  it('should execute a plugin if specified in the context', async () => {
    // 1. Setup mock plugin
    const mockPlugin: Plugin = {
      name: 'regex',
      run: vi.fn().mockResolvedValue({ modifiedInput: 'MODIFIED: hello world' }),
    };

    // 2. Setup PluginManager mock to return the plugin
    vi.mocked(mockPluginManager.get).mockReturnValue(mockPlugin);

    // 3. Define context to trigger the plugin
    const context: RouterContext = {
      useCase: 'Code generation',
      plugin: 'regex',
    };

    // 4. Call the router
    const result = await router.route('hello world', context);

    // 5. Assertions
    expect(mockPluginManager.get).toHaveBeenCalledWith('regex');
    expect(mockPlugin.run).toHaveBeenCalledWith('hello world');
    expect(mockInvokeNexusLLM).toHaveBeenCalledWith('Code generation', 'MODIFIED: hello world');
    expect(result.pluginUsed).toBe('regex');
    expect(result.output).toBe('some llm response');
  });

  it('should not execute a plugin if requested plugin is not found', async () => {
    // 1. Setup PluginManager mock to return undefined
    vi.mocked(mockPluginManager.get).mockReturnValue(undefined);

    // 2. Define context to request a non-existent plugin
    const context: RouterContext = {
      useCase: 'Code generation',
      plugin: 'non-existent-plugin',
    };

    // 3. Call the router
    const result = await router.route('hello world', context);

    // 4. Assertions
    expect(mockPluginManager.get).toHaveBeenCalledWith('non-existent-plugin');
    // The original input should be used
    expect(mockInvokeNexusLLM).toHaveBeenCalledWith('Code generation', 'hello world');
    // No plugin should be marked as used
    expect(result.pluginUsed).toBeUndefined();
  });
});
