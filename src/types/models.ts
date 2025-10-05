import { invokeCommandRPlus } from '../lib/providers/command-r-plus';
import { invokeDeepSeek } from '../lib/providers/deepseek';
import { invokeGemini } from '../lib/providers/gemini';
import { invokeGemma } from '../lib/providers/gemma';
import { invokeLlama } from '../lib/providers/llama-3';
import { invokeMistral } from '../lib/providers/Mistral';
import { invokePhi } from '../lib/providers/phi-4';
import { ModelInvocationHandler } from './providers';

export const MODEL_NAME = {
  LLAMA_3: 'Llama-3.3',
  GEMINI_FLASH_2_5: 'Gemini Flash 2.5',
  GEMMA_3_27B_IT: 'Gemma-3-27B-IT',
  COMMAND_R_PLUS: 'Command R+',
  PHI_4: 'Phi-4',
  MISTRAL: 'Mistral',
  DEEPSEEK: 'DeepSeek V3',
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
  'Conversational AI': 'router',
  'Question answering': 'summarizer',
  'Math reasoning': 'coder',
  'Advanced reasoning': 'summarizer',
  'Code generation': 'coder',
  'Code understanding': 'coder',
  'Multilingual tasks': 'summarizer',
  'Tool use': 'router',
  'Function calling': 'router',
  RAG: 'router',
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
  Mistral: invokeMistral,
  'DeepSeek V3': invokeDeepSeek,
  'Command R+': invokeCommandRPlus,
  'Llama-3.3': invokeLlama,
};
