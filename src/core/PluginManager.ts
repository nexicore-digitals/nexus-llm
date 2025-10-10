import { Plugin, PluginName } from '../types/plugins';

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();

  register(plugin: Plugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(
        `[PluginManager] Warning: Plugin "${plugin.name}" is already registered. Overwriting.`
      );
    }
    this.plugins.set(plugin.name, plugin);
    console.log(`[PluginManager] Registered plugin: "${plugin.name}"`);
  }

  get(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }
}

export const pluginManager = new PluginManager();
