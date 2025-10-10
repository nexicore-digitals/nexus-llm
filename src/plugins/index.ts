import { DocPlugin } from './DocPlugin';
import { Plugin, PluginName } from '../types/plugins';
import { ExplainerPlugin } from './ExplainerPlugin';
import { MemoryPlugin } from './MemoryPlugin';
import { RegexPlugin } from './RegexPlugin';
import { ToolRouterPlugin } from './ToolRouterPlugin';

export const pluginRegistry: Partial<Record<PluginName, Plugin>> = {
  memory: MemoryPlugin,
  doc: DocPlugin,
  explainer: ExplainerPlugin,
  regex: RegexPlugin,
  'tool-router': ToolRouterPlugin,
  // future: LoggerPlugin, ValidatorPlugin, etc.
};

export * from './DocPlugin';
export * from './ExplainerPlugin';
export * from './MemoryPlugin';
export * from './RegexPlugin';
export * from './ToolRouterPlugin';
