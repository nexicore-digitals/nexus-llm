import { ModelMetadata } from '../types/models/models';
import { AUDIO_MODEL_REGISTRY } from './models/audio';
import { IMAGEGEN_MODEL_REGISTRY } from './models/imagegen';
import { LLM_REGISTRY } from './models/llm';
import { VISION_MODEL_REGISTRY } from './models/vision';

export const MODEL_REGISTRY: ModelMetadata[] = [
  ...AUDIO_MODEL_REGISTRY,
  ...IMAGEGEN_MODEL_REGISTRY,
  ...LLM_REGISTRY,
  ...VISION_MODEL_REGISTRY,
];

export const MODEL_REGISTRY_BY_NAME: Record<string, ModelMetadata> = Object.fromEntries(
  MODEL_REGISTRY.map(model => [model.name, model])
);
