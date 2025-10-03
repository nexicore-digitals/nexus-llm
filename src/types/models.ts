export const MODEL_NAME = {
  GEMINI_FLASH_2_5: 'Gemini Flash 2.5',
  GEMMA_2: 'Gemma 2',
  COMMAND_R: 'Command R',
  STARCODER_2: 'StarCoder2',
  STABLELM_2: 'StableLM 2',
  YI: 'Yi',
  DEEPSEEK: 'DeepSeek V3',
  QWEN_2_5: 'Qwen2.5',
  LLAMA_3: 'Llama 3',
  MISTRAL: 'Mistral',
  FALCON_3: 'Falcon 3',
  PHI_4: 'Phi-4',
} as const;

type ModelsCount = 12;

type Range<N extends number, R extends number[] = []> = R['length'] extends N
  ? R[number]
  : Range<N, [...R, R['length']]>;

export type ModelPossibleIndex = Range<ModelsCount>; // → 0 | 1 | ... | 11

export type ModelName = (typeof MODEL_NAME)[keyof typeof MODEL_NAME];

export const USE_CASES = [
  'General text generation',
  'Summarization',
  'Question answering',
  'Code generation',
  'Code understanding',
  'Code completion',
  'Multilingual tasks',
  'Multilingual processing',
  'Multilingual applications',
  'Multi-language programming',
  'Bilingual text generation',
  'Math reasoning',
  'Mathematical tasks',
  'Mathematical reasoning',
  'Math and reasoning tasks',
  'Scientific knowledge',
  'Tool use',
  'Function calling',
  'Fine-tuning',
  'Fine-tuning for specific domains',
  'Fine-tuning for specific tasks',
  'Long-form content',
  'Long-form content generation',
  'Conversational AI',
  'RAG',
  'Image understanding',
  'Image understanding (vision)',
  'Multimodal input',
  'On-device inference',
  'On-device AI',
  'Edge computing',
  'High-complexity tasks',
  'Efficient large-scale processing',
  'Structured data processing',
  'Advanced reasoning (V3)',
  'Fast general-purpose inference',
  'Long-context reasoning',
  'Research and commercial applications',
] as const;

export type UseCase = (typeof USE_CASES)[number];

export const MODEL_ROLES = {
  generalist: 'Fast fallback for general text tasks',
  summarizer: 'Optimized for summarization',
  coder: 'Code generation and understanding',
  multilingual: 'Translation or cross-language tasks',
  vision: 'Image or multimodal input',
  router: 'Used for orchestration or fallback logic',
  prefect: 'Reserved for branded agents like Gemini or NexusLLM',
} as const;

export type ModelRole = keyof typeof MODEL_ROLES;

export interface ModelMetadata {
  name: ModelName;
  family: string;
  developer: string;
  params: string[]; // e.g. ['7B', '70B']
  contextWindow: string[]; // e.g. ['8k', '128k']
  useCases: UseCase[]; // e.g. ['Code generation', 'Multilingual tasks']
  license: string;
  requiresToken: boolean;
  role: ModelRole; // default to 'generalist'
}
