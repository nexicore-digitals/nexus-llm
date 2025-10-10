import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { PluginManager, Plugin } from '../../../src/core/PluginManager';

describe('PluginManager', () => {
  let pluginManager: PluginManager;

  // Mock a simple plugin for testing
  const mockPlugin: Plugin = {
    name: 'test-plugin',
    run: async (input: string) => ({ modifiedInput: `test: ${input}` }),
  };

  beforeEach(() => {
    pluginManager = new PluginManager();
    // Suppress console output during tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should register a new plugin and retrieve it', () => {
    pluginManager.register(mockPlugin);
    const retrieved = pluginManager.get('test-plugin');

    expect(retrieved).toBe(mockPlugin);
    expect(retrieved?.name).toBe('test-plugin');
    expect(console.log).toHaveBeenCalledWith('[PluginManager] Registered plugin: "test-plugin"');
  });

  it('should return undefined for a non-existent plugin', () => {
    const retrieved = pluginManager.get('non-existent-plugin');
    expect(retrieved).toBeUndefined();
  });

  it('should overwrite an existing plugin when registering with the same name', () => {
    const newPluginWithSameName: Plugin = {
      name: 'test-plugin',
      run: async (input: string) => ({ modifiedInput: `new: ${input}` }),
    };

    // Register the first plugin
    pluginManager.register(mockPlugin);
    expect(pluginManager.get('test-plugin')).toBe(mockPlugin);

    // Register the new plugin with the same name
    pluginManager.register(newPluginWithSameName);
    const retrieved = pluginManager.get('test-plugin');

    // Verify the new plugin has replaced the old one
    expect(retrieved).toBe(newPluginWithSameName);
    expect(console.warn).toHaveBeenCalledWith(
      '[PluginManager] Warning: Plugin "test-plugin" is already registered. Overwriting.'
    );
  });
});
