export type PluginName = 'memory' | 'logger' | 'validator';

export interface Plugin {
  name: PluginName;
  run: (input: string) => Promise<string>;
}
