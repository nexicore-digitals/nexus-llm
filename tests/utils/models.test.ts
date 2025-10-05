import { getModelForRole } from '../../src/utils/models';

describe('getModelForRole', () => {
  it('returns top model for each role', () => {
    expect(getModelForRole('prefect')).toBe('Gemini Flash 2.5');
    expect(getModelForRole('coder')).toBe('Mistral');
    expect(getModelForRole('summarizer')).toBe('Gemma-3-27B-IT');
    expect(getModelForRole('router')).toBe('DeepSeek V3');
    expect(getModelForRole('generalist')).toBe('Phi-4');
  });

  it('returns fallback model at index', () => {
    expect(getModelForRole('prefect', 1)).toBe('Command R+');
    expect(getModelForRole('generalist', 1)).toBe('Mistral');
  });

  it('returns undefined for out-of-range index', () => {
    expect(getModelForRole('coder', 12 as any)).toBeUndefined();
  });
});
