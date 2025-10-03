import { ModelMetadata } from '../types/models';

export const GEMINI_FLASH_2_5: ModelMetadata = {
  name: 'Gemini Flash 2.5',
  family: 'Gemini',
  developer: 'Google',
  params: [], // undisclosed
  contextWindow: ['1M'],
  useCases: [
    'Fast general-purpose inference',
    'Multimodal input',
    'Tool use',
    'Long-context reasoning',
  ],
  license: 'Google AI Studio / Vertex AI',
  requiresToken: true,
  role: 'prefect',
};

export const MODEL_REGISTRY: ModelMetadata[] = [
  GEMINI_FLASH_2_5,
  {
    name: 'Llama 3',
    family: 'Llama',
    developer: 'Meta',
    params: ['1B', '3B', '8B', '70B', '405B'],
    contextWindow: ['8k', '128k'],
    useCases: [
      'General text generation',
      'Multilingual tasks',
      'Code generation',
      'Long-form content',
      'Fine-tuning for specific domains',
    ],
    license: 'Llama Community License',
    requiresToken: false,
    role: 'generalist',
  },
  {
    name: 'Mistral',
    family: 'Mistral',
    developer: 'Mistral AI',
    params: ['3B–124B'],
    contextWindow: ['32k–128k'],
    useCases: [
      'High-complexity tasks',
      'Multilingual processing',
      'Code generation',
      'Image understanding',
      'Edge computing',
      'On-device AI',
      'Function calling',
      'Efficient large-scale processing',
    ],
    license: 'Apache 2.0 / Mistral Research / Commercial',
    requiresToken: false,
    role: 'generalist',
  },
  {
    name: 'Falcon 3',
    family: 'Falcon',
    developer: 'TII',
    params: ['1B', '3B', '7B', '10B'],
    contextWindow: ['8k–32k'],
    useCases: [
      'General text generation',
      'Code generation',
      'Mathematical tasks',
      'Scientific knowledge',
      'Multilingual applications',
      'Fine-tuning for specific domains',
    ],
    license: 'TII Falcon License',
    requiresToken: false,
    role: 'generalist',
  },
  {
    name: 'Gemma 2',
    family: 'Gemma',
    developer: 'Google',
    params: ['2B', '9B', '27B'],
    contextWindow: ['8k'],
    useCases: [
      'General text generation',
      'Question answering',
      'Summarization',
      'Code generation',
      'Fine-tuning for specific domains',
    ],
    license: 'Gemma License',
    requiresToken: false,
    role: 'summarizer',
  },
  {
    name: 'Phi-4',
    family: 'Phi',
    developer: 'Microsoft',
    params: ['3.8B', '7B', '14B', '42B (MoE)'],
    contextWindow: ['4k', '8k', '128k', '16k (Phi-4)'],
    useCases: [
      'General text generation',
      'Multilingual tasks',
      'Code understanding',
      'Math reasoning',
      'Image understanding (vision)',
      'On-device inference',
    ],
    license: 'Microsoft Research License',
    requiresToken: false,
    role: 'generalist',
  },
  {
    name: 'Command R',
    family: 'Command R',
    developer: 'Cohere',
    params: ['7B', '35B', '104B'],
    contextWindow: ['128k'],
    useCases: [
      'Conversational AI',
      'RAG',
      'Tool use',
      'Multilingual tasks',
      'Long-form content generation',
    ],
    license: 'CC-BY-NC 4.0',
    requiresToken: false,
    role: 'router',
  },
  {
    name: 'StableLM 2',
    family: 'StableLM',
    developer: 'Stability AI',
    params: ['1.6B', '3B', '12B'],
    contextWindow: ['16k'],
    useCases: [
      'Multilingual tasks',
      'Code understanding',
      'Code generation',
      'Fine-tuning for specific tasks',
      'Research and commercial applications',
    ],
    license: 'Stability AI Community / Enterprise',
    requiresToken: false,
    role: 'coder',
  },
  {
    name: 'StarCoder2',
    family: 'StarCoder',
    developer: 'BigCode',
    params: ['3B', '7B', '15B'],
    contextWindow: ['16k'],
    useCases: [
      'Code completion',
      'Multi-language programming',
      'Code understanding',
      'Code generation',
      'Fine-tuning for specific tasks',
    ],
    license: 'Apache 2.0',
    requiresToken: false,
    role: 'coder',
  },
  {
    name: 'Yi',
    family: 'Yi',
    developer: '01.AI',
    params: ['6B', '9B', '34B'],
    contextWindow: ['4k', '8k', '200k'],
    useCases: [
      'Bilingual text generation',
      'Code understanding',
      'Code generation',
      'Math and reasoning tasks',
      'Fine-tuning for specific domains',
    ],
    license: 'Apache 2.0',
    requiresToken: false,
    role: 'coder',
  },
  {
    name: 'Qwen2.5',
    family: 'Qwen',
    developer: 'Alibaba',
    params: ['0.5B–72B'],
    contextWindow: ['128k'],
    useCases: [
      'General text generation',
      'Multilingual tasks',
      'Code generation',
      'Mathematical reasoning',
      'Structured data processing',
    ],
    license: 'Qwen License (3B/72B), Apache 2.0 (others)',
    requiresToken: false,
    role: 'generalist',
  },
  {
    name: 'DeepSeek V3',
    family: 'DeepSeek',
    developer: 'DeepSeek AI',
    params: ['16B', '236B', '671B (V3)', '2.4B–37B activated'],
    contextWindow: ['32k–128k'],
    useCases: [
      'General text generation',
      'Multilingual tasks',
      'Code understanding',
      'Code generation',
      'Fine-tuning',
      'Advanced reasoning (V3)',
    ],
    license: 'DeepSeek License',
    requiresToken: false,
    role: 'generalist',
  },
];

export const MODELS_COUNT = MODEL_REGISTRY.length;

export const MODEL_REGISTRY_BY_NAME: Record<string, ModelMetadata> = Object.fromEntries(
  MODEL_REGISTRY.map(model => [model.name, model])
);

export const MODEL_REGISTRY_BY_USE_CASE: Record<string, ModelMetadata[]> = {};

MODEL_REGISTRY.forEach(model => {
  model.useCases.forEach(useCase => {
    if (!MODEL_REGISTRY_BY_USE_CASE[useCase]) {
      MODEL_REGISTRY_BY_USE_CASE[useCase] = [];
    }
    MODEL_REGISTRY_BY_USE_CASE[useCase].push(model);
  });
});
