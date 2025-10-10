export type PluginName =
  | 'memory'
  | 'logger'
  | 'validator'
  | 'doc'
  | 'explainer'
  | 'regex'
  | 'tool-router';

export interface Plugin {
  name: PluginName;
  run: (input: string) => Promise<string>;
}
