import { NexusRouter } from '../../../src/core/NexusRouter';
import { isExcluded } from '../../../src/types/guards';
import { PluginName } from '../../../src/types/plugins';

const router = new NexusRouter();
const pluginNames: PluginName[] = ['memory', 'validator', 'logger'];

describe('NexusRouter', () => {
  it('routes to MemoryPlugin', async () => {
    const res = await router.route('Hello', { plugin: pluginNames[0] });
    expect(res.output).toContain('MemoryPlugin received');
  });

  it('returns fallback when plugin missing', async () => {
    // ❗ Assign an unknown plugin name below.
    // If you change this to a known plugin (e.g. 'memory'), it will throw immediately.
    const unknownPluginName = isExcluded('ghost', pluginNames);
    const res = await router.route('Hello', { plugin: unknownPluginName });
    expect(res.output).toContain('No plugin matched');
  });
});
