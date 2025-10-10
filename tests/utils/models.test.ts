import { getModelForRole } from '../../src/utils/models';

describe('getModelForRole', () => {
  it('returns top model for each role', () => {
    expect(getModelForRole('prefect')).toBe('Gemini Flash 2.5');
    expect(getModelForRole('coder')).toBe('StarCoder2');
    expect(getModelForRole('summarizer')).toBe('Gemma-3-27B-IT');
    expect(getModelForRole('router')).toBe('Llama-3.3');
    expect(getModelForRole('generalist')).toBe('Qwen2.5');
    expect(getModelForRole('listener')).toBe('Whisper Large-V3');
    expect(getModelForRole('speaker')).toBe('XTTS v2');
    expect(getModelForRole('visualist')).toBe('Qwen2.5-VL');
    expect(getModelForRole('generator')).toBe('SDXL Turbo INT8 ONNX');
  });

  it('returns fallback model at index', () => {
    expect(getModelForRole('prefect', 1)).toBe('Llama-3.3');
    expect(getModelForRole('generalist', 1)).toBe('Gemma-3-27B-IT');
    expect(getModelForRole('visualist', 1)).toBe('BLIP-2');
    expect(getModelForRole('generator', 1)).toBe('Qwen2.5-VL');
    expect(getModelForRole('listener', 1)).toBe('Coqui STT');
    expect(getModelForRole('speaker', 1)).toBe('Bark');
  });

  it('returns undefined for out-of-range index', () => {
    expect(getModelForRole('coder', 19 as any)).toBeUndefined();
  });
});
