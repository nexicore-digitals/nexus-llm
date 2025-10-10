import {
  invokeBark,
  invokeCoquiSTT,
  invokeStyleTTS2,
  invokeVosk,
  invokeWhisperBase,
  invokeWhisperLarge,
  invokeWhisperSmall,
  invokeWhisperTiny,
  invokeXtts,
  invokeSdxlTurbo,
  invokeDeepSeekR1,
  invokeGemini,
  invokeGemma,
  invokeLlama,
  invokeQwen2,
  invokeStarCoder2,
  invokeBlip2,
  invokeClip,
  invokeQwenVL,
} from '../../lib/providers';
import { ModelInvocationHandler } from '../providers';
import { ModelRole } from './model-roles';
import { UseCase } from './model-usecase';

export const MODEL_NAME = {
  // Existing LLMs
  LLAMA_3: 'Llama-3.3',
  GEMINI_FLASH_2_5: 'Gemini Flash 2.5',
  GEMMA_3_27B_IT: 'Gemma-3-27B-IT',
  DEEPSEEK_R1: 'DeepSeek R1',
  QWEN_2_5: 'Qwen2.5',
  STARCODER_2: 'StarCoder2',

  // Vision / Image Understanding
  QWEN_2_5_VL: 'Qwen2.5-VL',
  BLIP_2: 'BLIP-2',
  CLIP: 'CLIP Interrogator',

  // Image Generation
  SDXL_TURBO: 'SDXL Turbo INT8 ONNX',

  // Speech-to-Text (STT)
  WHISPER_TINY: 'Whisper Tiny',
  WHISPER_BASE: 'Whisper Base',
  WHISPER_SMALL: 'Whisper Small',
  WHISPER_LARGE_V3: 'Whisper Large-V3',
  VOSK: 'Vosk',
  COQUI_STT: 'Coqui STT',

  // Text-to-Speech (TTS)
  XTTS_V2: 'XTTS v2',
  BARK: 'Bark',
  STYLETTS2: 'StyleTTS2',
} as const;

type ModelsCount = 19;

type Range<N extends number, R extends number[] = []> = R['length'] extends N
  ? R[number]
  : Range<N, [...R, R['length']]>;

export type ModelPossibleIndex = Range<ModelsCount>; // → 0 | 1 | ... | 5

export type ModelName = (typeof MODEL_NAME)[keyof typeof MODEL_NAME];

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
  // LLMs
  [MODEL_NAME.LLAMA_3]: invokeLlama,
  [MODEL_NAME.GEMINI_FLASH_2_5]: invokeGemini,
  [MODEL_NAME.GEMMA_3_27B_IT]: invokeGemma,
  [MODEL_NAME.DEEPSEEK_R1]: invokeDeepSeekR1,
  [MODEL_NAME.QWEN_2_5]: invokeQwen2,
  [MODEL_NAME.STARCODER_2]: invokeStarCoder2,

  // Vision
  [MODEL_NAME.QWEN_2_5_VL]: invokeQwenVL,
  [MODEL_NAME.BLIP_2]: invokeBlip2,
  [MODEL_NAME.CLIP]: invokeClip,

  // Image Generation
  [MODEL_NAME.SDXL_TURBO]: invokeSdxlTurbo,

  // Speech-to-Text
  [MODEL_NAME.WHISPER_TINY]: invokeWhisperTiny,
  [MODEL_NAME.WHISPER_BASE]: invokeWhisperBase,
  [MODEL_NAME.WHISPER_SMALL]: invokeWhisperSmall,
  [MODEL_NAME.WHISPER_LARGE_V3]: invokeWhisperLarge,
  [MODEL_NAME.VOSK]: invokeVosk,
  [MODEL_NAME.COQUI_STT]: invokeCoquiSTT,

  // Text-to-Speech
  [MODEL_NAME.XTTS_V2]: invokeXtts,
  [MODEL_NAME.BARK]: invokeBark,
  [MODEL_NAME.STYLETTS2]: invokeStyleTTS2,
};
