import { getModelForRole } from '../../src/utils/models';

describe('getModelForRole', () => {
  it('returns top model for each role', () => {
    expect(getModelForRole('prefect')).toBe('Gemini Flash 2.5');
    expect(getModelForRole('coder')).toBe('StarCoder2');
    expect(getModelForRole('summarizer')).toBe('Gemma 2');
    expect(getModelForRole('router')).toBe('Command R');
    expect(getModelForRole('generalist')).toBe('DeepSeek V3');
  });

  it('returns fallback model at index', () => {
    expect(getModelForRole('generalist', 8)).toBe('Llama 3');
  });

  it('returns undefined for out-of-range index', () => {
    expect(getModelForRole('coder', 10)).toBe('Falcon 3');
    expect(getModelForRole('coder', 12 as any)).toBeUndefined();
  });
});
