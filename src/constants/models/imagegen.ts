import { ModelMetadata } from '../../types/models/models';

export const IMAGEGEN_MODEL_REGISTRY: ModelMetadata[] = [
  {
    name: 'SDXL Turbo INT8 ONNX',
    family: 'Stable Diffusion XL',
    developer: 'Stability AI',
    params: ['2.6B'],
    contextWindow: ['n/a'],
    useCases: [
      'Image generation',
      'UI/UX concept creation',
      'Design prototyping',
      'Artistic rendering',
    ],
    license: 'CreativeML OpenRAIL-M',
    requiresToken: false,
    role: 'designer',
  },
];
