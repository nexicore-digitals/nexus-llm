import { getModelForRole } from '../../src/utils/models';

describe('getModelForRole', () => {
  it('returns top model for each role', () => {
    expect(getModelForRole('prefect')).toBe('Gemini Flash 2.5');
    expect(getModelForRole('coder')).toBe('StarCoder2');
    expect(getModelForRole('summarizer')).toBe('Gemma-3-27B-IT');
    expect(getModelForRole('router')).toBe('Llama-3.3');
    expect(getModelForRole('generalist')).toBe('Phi-4');
  });

  it('returns fallback model at index', () => {
    expect(getModelForRole('prefect', 1)).toBe('Llama-3.3');
    expect(getModelForRole('generalist', 1)).toBe('DeepSeek V3');
  });

  it('returns undefined for out-of-range index', () => {
    expect(getModelForRole('coder', 12 as any)).toBeUndefined();
  });
});
