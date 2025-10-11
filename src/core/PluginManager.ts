import { PluginName } from '../types/plugins';
import { LLMResponse, RouterContext } from '../types/router';

export interface Plugin {
  name: PluginName;
  /**
   * Executes the plugin's logic on the input string before the LLM call.
   */
  run?(input: string, context?: RouterContext): Promise<{ readonly modifiedInput: string }>;
  /**
   * Executes the plugin's logic on the LLMResponse after the LLM call.
   */
  postRun?(response: LLMResponse, context?: RouterContext): Promise<LLMResponse>;
}

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
