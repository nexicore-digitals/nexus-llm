import { invokeDeepSeekV3 } from '../lib/providers/deepseek';
import { invokeDeepSeekR1 } from '../lib/providers/deepseek-r1';
import { invokeGemini } from '../lib/providers/gemini';
import { invokeGemma } from '../lib/providers/gemma';
import { invokeLlama } from '../lib/providers/llama-3';
import { invokePhi } from '../lib/providers/phi-4';
import { invokeStarCoder2 } from '../lib/providers/starcoder2';
import { ModelInvocationHandler } from './providers';

export const MODEL_NAME = {
  LLAMA_3: 'Llama-3.3',
  GEMINI_FLASH_2_5: 'Gemini Flash 2.5',
  GEMMA_3_27B_IT: 'Gemma-3-27B-IT',
  PHI_4: 'Phi-4',
  DEEPSEEK: 'DeepSeek V3',
  DEEPSEEK_R1: 'DeepSeek R1',
  STARCODER_2: 'StarCoder2',
} as const;

type ModelsCount = 6;

type Range<N extends number, R extends number[] = []> = R['length'] extends N
  ? R[number]
  : Range<N, [...R, R['length']]>;

export type ModelPossibleIndex = Range<ModelsCount>; // → 0 | 1 | ... | 5

export type ModelName = (typeof MODEL_NAME)[keyof typeof MODEL_NAME];

export const USE_CASES = [
  // 🔤 General & Conversational
  'General text generation',
  'Long-form content generation',
  'Conversational AI',
  'Question answering',

  // 🧠 Reasoning & Math
  'Math reasoning',
  'Advanced reasoning',
  'Reasoning',

  // 📝 Instruction following
  'Instruction following',
  'General instruction following',

  // 💻 Code & Programming
  'Code generation',
  'Code understanding',

  // 🌍 Multilingual & Translation
  'Multilingual tasks',

  // 🧩 Tool Use & Function Calling
  'Tool use',
  'Function calling',
  'RAG',

  // 🧠 Summarization & Compression
  'Summarization',

  // 🧪 Fine-Tuning & Adaptation
  'Fine-tuning for specific domains',

  // 🖼️ Multimodal & Vision
  'Image understanding',

  // ⚙️ Deployment & Efficiency
  'On-device inference',
  'Efficient large-scale processing',
] as const;

export type UseCase = (typeof USE_CASES)[number];

export const MODEL_ROLES = {
  generalist: 'Fast fallback for general text tasks',
  summarizer: 'Optimized for summarization',
  coder: 'Code generation and understanding',
  router: 'Used for orchestration or fallback logic',
  prefect: 'Reserved for branded agents like Gemini or NexusLLM',
} as const;

export type ModelRole = keyof typeof MODEL_ROLES;

export const USECASE_ROLE_MAP: Record<UseCase, ModelRole> = {
  'General text generation': 'generalist',
  'Long-form content generation': 'generalist',
  'Conversational AI': 'generalist',
  'Question answering': 'summarizer',
  'Math reasoning': 'generalist',
  'Advanced reasoning': 'generalist',
  Reasoning: 'generalist', // NEW
  'Instruction following': 'generalist',
  'General instruction following': 'generalist',
  'Code generation': 'coder',
  'Code understanding': 'coder',
  'Multilingual tasks': 'generalist',
  'Tool use': 'prefect',
  'Function calling': 'prefect',
  RAG: 'prefect',
  Summarization: 'summarizer',
  'Fine-tuning for specific domains': 'prefect',
  'Image understanding': 'generalist',
  'On-device inference': 'prefect',
  'Efficient large-scale processing': 'prefect',
};

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

export const MODEL_CALLABLE_MAP: Record<ModelName, ModelInvocationHandler> = {
  'Gemini Flash 2.5': invokeGemini,
  'Gemma-3-27B-IT': invokeGemma,
  'Phi-4': invokePhi,
  'DeepSeek V3': invokeDeepSeekV3,
  'DeepSeek R1': invokeDeepSeekR1,
  'Llama-3.3': invokeLlama,
  StarCoder2: invokeStarCoder2,
};
