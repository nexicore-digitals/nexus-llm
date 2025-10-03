import { Plugin, PluginName } from '../types/plugins';
import { MemoryPlugin } from './MemoryPlugin';

export const pluginRegistry: Partial<Record<PluginName, Plugin>> = {
  memory: MemoryPlugin,
  // future: LoggerPlugin, ValidatorPlugin, etc.
};
