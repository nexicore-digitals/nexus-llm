import { ModelRole } from './model-roles';

export const USE_CASES = [
  // 🔤 General & Conversational
  'General text generation',
  'Long-form content generation',
  'Conversational AI',
  'Question answering',

  // 🧠 Reasoning & Math
  'Math reasoning',
  'Advanced reasoning',
  'Logical reasoning',

  // 📝 Instruction following
  'Instruction following',
  'General instruction following',

  // 💻 Code & Programming
  'Code generation',
  'Code understanding',
  'Code completion',
  'Code explanation',

  // 🌍 Multilingual & Translation
  'Multilingual tasks',
  'Translation',

  // 🧩 Tool Use & Function Calling
  'Tool use',
  'Function calling',
  'RAG',
  'Knowledge retrieval',

  // 🧠 Summarization & Compression
  'Summarization',
  'Compression',

  // 🧪 Fine-Tuning & Adaptation
  'Fine-tuning for specific domains',
  'Domain adaptation',

  // 🖼️ Vision & Multimodal
  'Image understanding',
  'Image generation',
  'Image captioning',
  'Image recognition',
  'Object detection',
  'Visual reasoning',
  'OCR (text from images)',

  // 🎥 Video
  'Video understanding',
  'Video captioning',
  'Video summarization',

  // 🔊 Audio & Speech
  'Speech recognition',
  'Speech-to-text (STT)',
  'Text-to-speech (TTS)',
  'Voice synthesis',
  'Real-time transcription',
  'Audio understanding',

  // ⚙️ Deployment & Efficiency
  'On-device inference',
  'Efficient large-scale processing',
  'Low-latency generation',
] as const;

export type UseCase = (typeof USE_CASES)[number];

export const USECASE_ROLE_MAP: Record<UseCase, ModelRole> = {
  // 🔤 General & Conversational
  'General text generation': 'generalist',
  'Long-form content generation': 'generalist',
  'Conversational AI': 'generalist',
  'Question answering': 'summarizer',

  // 🧠 Reasoning & Math
  'Math reasoning': 'generalist',
  'Advanced reasoning': 'generalist',
  'Logical reasoning': 'generalist',

  // 📝 Instruction following
  'Instruction following': 'generalist',
  'General instruction following': 'generalist',

  // 💻 Code & Programming
  'Code generation': 'coder',
  'Code understanding': 'coder',
  'Code completion': 'coder',
  'Code explanation': 'coder',

  // 🌍 Multilingual & Translation
  'Multilingual tasks': 'generalist',
  Translation: 'generalist',

  // 🧩 Tool Use & Function Calling
  'Tool use': 'prefect',
  'Function calling': 'prefect',
  RAG: 'retriever',
  'Knowledge retrieval': 'retriever',

  // 🧠 Summarization & Compression
  Summarization: 'summarizer',
  Compression: 'summarizer',

  // 🧪 Fine-Tuning & Adaptation
  'Fine-tuning for specific domains': 'prefect',
  'Domain adaptation': 'prefect',

  // 🖼️ Vision & Multimodal
  'Image understanding': 'visualist',
  'Image generation': 'generator',
  'Image captioning': 'visualist',
  'Image recognition': 'visualist',
  'Object detection': 'visualist',
  'Visual reasoning': 'visualist',
  'OCR (text from images)': 'visualist',

  // 🎥 Video
  'Video understanding': 'visualist',
  'Video captioning': 'visualist',
  'Video summarization': 'summarizer',

  // 🔊 Audio & Speech
  'Speech recognition': 'listener',
  'Speech-to-text (STT)': 'listener',
  'Text-to-speech (TTS)': 'speaker',
  'Voice synthesis': 'speaker',
  'Real-time transcription': 'listener',
  'Audio understanding': 'listener',

  // ⚙️ Deployment & Efficiency
  'On-device inference': 'prefect',
  'Efficient large-scale processing': 'prefect',
  'Low-latency generation': 'prefect',
};
