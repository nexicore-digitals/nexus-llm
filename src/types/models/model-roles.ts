export const MODEL_ROLES = {
  // 🧠 Core Text Roles
  generalist: 'Fallback for general text, reasoning, and conversational tasks',
  summarizer: 'Optimized for summarization, compression, and content condensation',
  coder: 'Specialized for code generation, completion, understanding, and explanation',
  router: 'Used for orchestration, routing, or fallback logic',
  prefect: 'Reserved for branded or flagship agents like Gemini or NexusLLM',

  // 🖼️ Vision & Multimodal
  visualist:
    'Handles vision-language tasks such as image understanding, recognition, or visual reasoning',
  captioner: 'Specialized in generating descriptive captions or prompts from images',
  generator: 'Generates creative media such as images or video frames',

  // 🔊 Audio & Speech
  listener: 'Performs speech recognition and audio understanding (STT)',
  speaker: 'Performs text-to-speech or voice synthesis (TTS)',
} as const;

export type ModelRole = keyof typeof MODEL_ROLES;
