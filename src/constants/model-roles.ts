import { ModelRole } from '../types/models/model-roles';
import { ModelName } from '../types/models/models';

export const ROLE_PRIORITY_MATRIX: Record<ModelName, Partial<Record<ModelRole, number>>> = {
  // --- Text & Conversational ---
  'Gemini Flash 2.5': { prefect: 1, router: 2, summarizer: 5, coder: 6, generalist: 4 },
  'Gemma-3-27B-IT': { prefect: 7, router: 5, summarizer: 1, coder: 4, generalist: 3 },
  'Qwen2.5': { prefect: 6, router: 7, summarizer: 4, coder: 2, generalist: 1 },
  'DeepSeek R1': { prefect: 4, router: 3, summarizer: 2, coder: 5, generalist: 5 },
  StarCoder2: { prefect: 5, router: 4, summarizer: 6, coder: 1, generalist: 6 },
  'Llama-3.3': { prefect: 2, router: 1, summarizer: 7, coder: 3, generalist: 7 },

  // --- Vision & Multimodal ---
  'Qwen2.5-VL': { visualist: 1, generator: 3 },
  'BLIP-2': { visualist: 2, generator: 4 },
  'CLIP Interrogator': { visualist: 3, generator: 5 },
  'SDXL Turbo INT8 ONNX': { generator: 1, visualist: 4 },

  // --- Audio & Speech ---
  'Whisper Tiny': { listener: 6 },
  'Whisper Base': { listener: 5 },
  'Whisper Small': { listener: 4 },
  'Whisper Large-V3': { listener: 1 },
  Vosk: { listener: 7 },
  'Coqui STT': { listener: 3 },
  'XTTS v2': { speaker: 1 },
  Bark: { speaker: 2 },
  StyleTTS2: { speaker: 3 },
};
