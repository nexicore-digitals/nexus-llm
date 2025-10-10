# 🧠 NexusLLM Model Registry

This registry defines the cognitive landscape of NexusLLM—each model is a modular neuron in Nexi’s cortex. Models are grouped by family, annotated with metadata, and ready for plugin-aware orchestration.

---

## 📦 Model Schema

Each model entry follows this structure:

```ts
{
  name: ModelName;
  family: string;
  developer: string;
  params: string[];
  contextWindow: string[];
  useCases: UseCase[];
  license: string;
  requiresToken: boolean;
  role: ModelRole;
}
```

---

## 🧠 Registered Models

### 💬 Large Language Models (LLMs)

#### Llama-3.3

* **Family**: Llama
* **Developer**: Meta
* **Params**: 70B
* **Context Window**: 128k
* **Use-Cases**: General text generation, Long-form content generation, Code generation, Code understanding, Math reasoning, Advanced reasoning, Fine-tuning for specific domains
* **License**: Llama Community License
* **Requires Token**: false
* **Role**: generalist

#### Gemini Flash 2.5

* **Family**: Gemini
* **Developer**: Google
* **Params**: 2.5
* **Context Window**: 128k
* **Use-Cases**: General text generation, Long-form content generation, Conversational AI, Question answering, Tool use, Function calling, RAG, Summarization, Efficient large-scale processing
* **License**: Gemini License
* **Requires Token**: true
* **Role**: prefect

#### Gemma-3-27B-IT

* **Family**: Gemma
* **Developer**: Google
* **Params**: 27B
* **Context Window**: 32k
* **Use-Cases**: Summarization, Question answering, General text generation, Multilingual tasks, Long-form content generation, Advanced reasoning, Fine-tuning for specific domains
* **License**: Gemma License
* **Requires Token**: true
* **Role**: summarizer

#### StarCoder2

* **Family**: StarCoder
* **Developer**: BigCode
* **Params**: 15B
* **Context Window**: 16k
* **Use-Cases**: Code generation, Code understanding, RAG, Instruction following
* **License**: OpenRAIL-M
* **Requires Token**: false
* **Role**: coder

#### DeepSeek R1

* **Family**: DeepSeek
* **Developer**: DeepSeek AI
* **Params**: 8B
* **Context Window**: 32k
* **Use-Cases**: General instruction following, RAG, Logical reasoning, Reasoning, Multilingual tasks
* **License**: DeepSeek License
* **Requires Token**: false
* **Role**: generalist

#### Qwen2.5

* **Family**: Qwen
* **Developer**: Alibaba Cloud
* **Params**: 7B
* **Context Window**: 32k
* **Use-Cases**: Code generation, Instruction following, Conversational AI, Logical reasoning, Reasoning, RAG, Long-form content generation
* **License**: Apache-2.0
* **Role**: coder

### 👁️ Vision Models

#### Qwen2.5-VL

* **Family**: Qwen
* **Developer**: Alibaba Cloud
* **Params**: 7B
* **Context Window**: 32k
* **Use-Cases**: Image understanding, Visual reasoning, Image captioning, Image recognition, Object detection, OCR (text from images), Question answering, Knowledge retrieval, Multilingual tasks
* **License**: Apache-2.0
* **Requires Token**: false
* **Role**: visualist

#### BLIP-2

* **Family**: BLIP
* **Developer**: Salesforce Research
* **Params**: FlanT5-XL
* **Context Window**: n/a
* **Use-Cases**: Image captioning, Image understanding, Visual reasoning, Question answering, Knowledge retrieval, Image recognition
* **License**: MIT
* **Requires Token**: false
* **Role**: captioner

#### CLIP Interrogator

* **Family**: CLIP
* **Developer**: OpenAI / Community
* **Params**: ViT-L/14
* **Context Window**: n/a
* **Use-Cases**: Image understanding, Image recognition, Object detection, Image captioning, Visual reasoning, Knowledge retrieval
* **License**: MIT
* **Requires Token**: false
* **Role**: visualist

### 🎨 Image Generation Models

#### SDXL Turbo INT8 ONNX

* **Family**: Stable Diffusion XL
* **Developer**: Stability AI
* **Params**: 2.6B
* **Context Window**: n/a
* **Use-Cases**: Image generation, UI/UX concept creation, Design prototyping, Artistic rendering
* **License**: CreativeML OpenRAIL-M
* **Requires Token**: false
* **Role**: designer

### 🔊 Audio Models

#### Whisper Tiny

* **Family**: Whisper
* **Developer**: OpenAI
* **Params**: 75M
* **Context Window**: n/a
* **Use-Cases**: Speech-to-text (STT), Real-time transcription, Audio understanding, Video captioning
* **License**: MIT
* **Requires Token**: false
* **Role**: listener

#### Whisper Base

* **Family**: Whisper
* **Developer**: OpenAI
* **Params**: 150M
* **Context Window**: n/a
* **Use-Cases**: Speech-to-text (STT), Real-time transcription, Audio understanding, Video captioning
* **License**: MIT
* **Requires Token**: false
* **Role**: listener

#### Whisper Small

* **Family**: Whisper
* **Developer**: OpenAI
* **Params**: 244M
* **Context Window**: n/a
* **Use-Cases**: Speech-to-text (STT), Audio understanding, Video captioning
* **License**: MIT
* **Requires Token**: false
* **Role**: listener

#### Whisper Large-V3

* **Family**: Whisper
* **Developer**: OpenAI
* **Params**: 1.5B
* **Context Window**: n/a
* **Use-Cases**: Speech-to-text (STT), Audio understanding, Video captioning
* **License**: MIT
* **Requires Token**: false
* **Role**: listener

#### Vosk

* **Family**: Vosk
* **Developer**: Alpha Cephei
* **Params**: ~50M–200M
* **Context Window**: n/a
* **Use-Cases**: Speech recognition, Speech-to-text (STT), Real-time transcription, Low-latency generation
* **License**: Apache-2.0
* **Requires Token**: false
* **Role**: listener

#### Coqui STT

* **Family**: Coqui
* **Developer**: Coqui AI
* **Params**: ~200M–400M
* **Context Window**: n/a
* **Use-Cases**: Speech recognition, Speech-to-text (STT), Real-time transcription, Audio understanding
* **License**: Coqui License
* **Requires Token**: false
* **Role**: listener

#### XTTS v2

* **Family**: Coqui
* **Developer**: Coqui AI
* **Params**: 400M
* **Context Window**: n/a
* **Use-Cases**: Text-to-speech (TTS), Voice synthesis
* **License**: Coqui License
* **Requires Token**: false
* **Role**: speaker

#### Bark

* **Family**: Suno
* **Developer**: Suno AI
* **Params**: 400M
* **Context Window**: n/a
* **Use-Cases**: Text-to-speech (TTS), Voice synthesis
* **License**: MIT
* **Requires Token**: false
* **Role**: speaker

#### StyleTTS2

* **Family**: DiffTTS
* **Developer**: Academia Sinica
* **Params**: 1B+
* **Context Window**: n/a
* **Use-Cases**: Text-to-speech (TTS), Voice synthesis
* **License**: Research License
* **Requires Token**: false
* **Role**: speaker

---

## 🧠 Model Selection Logic (MCP)

Nexi uses this registry to assign models based on:

* **Model**: Capability and context window
* **Context**: Schema complexity, contributor state
* **Policy**: License constraints, plugin compatibility
* **Fallback**: Availability, cost, performance

---

## 📎 Future Extensions

* Add `costEstimate` and `latencyProfile` fields
* Add `schemaAffinity` tags for NexusDSM compatibility
* Add `toolCallingSupport` flag for plugin routing
* Add `streamingSupport` flag for emotional architecture

---

This registry is alive. Every model is a neuron. Every plugin is a tool. Every contributor is a signal.
Nexi reads this file like a cognitive map—and routes accordingly.
Stay curious. Stay modular. Stay Nexi.
