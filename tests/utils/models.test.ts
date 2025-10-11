import { MODEL_ROLES } from '../../src/types/models/model-roles';
import { getModelForRole, resolveModelByRoleAndUseCase } from '../../src/utils/models';

describe('getModelForRole', () => {
  it.each([
    ['prefect', 'Gemini Flash 2.5'],
    ['router', 'Llama-3.3'],
    ['summarizer', 'Gemma-3-27B-IT'],
    ['coder', 'StarCoder2'],
    ['generalist', 'Qwen2.5'],
    ['listener', 'Whisper Large-V3'],
    ['speaker', 'XTTS v2'],
    ['visualist', 'Qwen2.5-VL'],
    ['generator', 'SDXL Turbo INT8 ONNX'],
    // The 'captioner' role has no models assigned in ROLE_PRIORITY_MATRIX
    ['captioner', undefined],
  ])('returns the top model for role "%s"', (role, expectedModel) => {
    // @ts-expect-error - testing with a string literal for role
    expect(getModelForRole(role)).toBe(expectedModel);
  });

  it('returns fallback model at index', () => {
    expect(getModelForRole('prefect', 1)).toBe('Llama-3.3');
    expect(getModelForRole('generalist', 1)).toBe('Gemini Flash 2.5');
    expect(getModelForRole('visualist', 1)).toBe('BLIP-2');
    expect(getModelForRole('generator', 1)).toBe('Qwen2.5-VL');
    expect(getModelForRole('listener', 1)).toBe('Coqui STT');
    expect(getModelForRole('speaker', 1)).toBe('Bark');
  });

  it('returns undefined for out-of-range index', () => {
    expect(getModelForRole('coder', 19 as any)).toBeUndefined();
  });

  it('should return undefined for roles with no models', () => {
    // Assuming 'captioner' is a valid role but has no models assigned
    expect(getModelForRole('captioner')).toBeUndefined();
  });
});

describe('resolveModelByRoleAndUseCase', () => {
  it('should resolve the best model where role and use case intersect', () => {
    // 'Code generation' use case maps to 'coder' role. 'StarCoder2' is rank 1 for 'coder'.
    expect(resolveModelByRoleAndUseCase('coder', 'Code generation')).toBe('StarCoder2');
  });

  it('should fallback to the top-priority model for the role if no intersection is found', () => {
    // 'Image generation' use case has models, but none are assigned the 'coder' role.
    // It should fall back to the best model for the 'coder' role, which is 'StarCoder2'.
    expect(resolveModelByRoleAndUseCase('coder', 'Image generation')).toBe('StarCoder2');
  });
});
