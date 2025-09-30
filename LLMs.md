# 🧠 NexusLLM Model Registry

This registry defines the cognitive landscape of NexusLLM—each model is a modular neuron in Nexi’s cortex. Models are grouped by family, annotated with metadata, and ready for plugin-aware orchestration.

---

## 📦 Model Schema

Each model entry follows this structure:

```ts
{
  name: "phi3",
  family: "Phi",
  developer: "Microsoft",
  params: ["3.8B", "7B", "14B", "42B (MoE)"],
  contextWindow: ["4k", "8k", "128k"],
  useCases: ["text", "code", "math", "multilingual", "on-device"],
  license: "Microsoft Research License",
  pluginCompatibility: ["RegexPlugin", "MemoryPlugin", "ToolRouterPlugin"],
  notes: "Fast, compact, ideal for validation and reasoning tasks"
}
```

---

## 🧠 Registered Models

### 🟦 Phi-3 / Phi-4

- **Family**: Phi
- **Developer**: Microsoft
- **Params**: 3.8B, 7B, 14B, 42B (MoE)
- **Context Window**: 4k, 8k, 128k, 16k (Phi-4)
- **Use-Cases**: General text, multilingual, code understanding, math reasoning, on-device inference
- **License**: Microsoft Research License
- **Plugin Compatibility**: ✅ Regex, ✅ Memory, ✅ ToolRouter
- **Notes**: Compact, fast, ideal for validation and schema-aware flows

---

### 🟨 Gemini 2.5 Flash

- **Family**: Gemini
- **Developer**: Google
- **Params**: 2B, 9B, 27B
- **Context Window**: 8k
- **Use-Cases**: Summarization, QA, general text, code generation
- **License**: Gemma License
- **Plugin Compatibility**: ✅ DocPlugin, ✅ ExplainerPlugin
- **Notes**: Fastest responder, ideal as class prefect for MCP orchestration

---

### 🟧 Mixtral / Mistral

- **Family**: Mistral
- **Developer**: Mistral AI
- **Params**: 3B–124B
- **Context Window**: 32k–128k
- **Use-Cases**: High-complexity tasks, multilingual, code, image, function calling
- **License**: Apache 2.0 / Commercial
- **Plugin Compatibility**: ✅ Regex, ✅ ToolRouter, ✅ Memory
- **Notes**: Ideal for deep reasoning, fallback, and ensemble validation

---

### 🟥 Falcon 3

- **Family**: Falcon
- **Developer**: TII
- **Params**: 1B, 3B, 7B, 10B
- **Context Window**: 8k–32k
- **Use-Cases**: General text, code, math, scientific knowledge
- **License**: TII Falcon License
- **Plugin Compatibility**: ✅ DocPlugin, ✅ RegexPlugin
- **Notes**: Strong in scientific and multilingual flows

---

### 🟩 Gemma 2

- **Family**: Gemma
- **Developer**: Google
- **Params**: 2B, 9B, 27B
- **Context Window**: 8k
- **Use-Cases**: Text generation, QA, summarization, code
- **License**: Gemma License
- **Plugin Compatibility**: ✅ DocPlugin
- **Notes**: Lightweight, schema-friendly, ideal for onboarding flows

---

### 🟪 StarCoder2

- **Family**: BigCode
- **Developer**: BigCode
- **Params**: 3B, 7B, 15B
- **Context Window**: 16k
- **Use-Cases**: Code completion, multi-language programming
- **License**: Apache 2.0
- **Plugin Compatibility**: ✅ RegexPlugin, ✅ ExplainerPlugin
- **Notes**: Ideal for contributor coding flows and reviewable suggestions

---

### 🟫 Yi

- **Family**: Yi
- **Developer**: 01.AI
- **Params**: 6B, 9B, 34B
- **Context Window**: 4k, 8k, 200k
- **Use-Cases**: Bilingual generation, code, math, reasoning
- **License**: Apache 2.0
- **Plugin Compatibility**: ✅ RegexPlugin, ✅ ToolRouterPlugin
- **Notes**: High-context, multilingual, ideal for edge cognition

---

### 🟦 Qwen2.5

- **Family**: Qwen
- **Developer**: Alibaba
- **Params**: 0.5B–72B
- **Context Window**: 128k
- **Use-Cases**: Text, multilingual, code, math, structured data
- **License**: Apache 2.0 / Qwen License
- **Plugin Compatibility**: ✅ ToolRouterPlugin, ✅ MemoryPlugin
- **Notes**: Ideal for structured data flows and schema hydration

---

### 🟧 DeepSeek V2/V3

- **Family**: DeepSeek
- **Developer**: DeepSeek AI
- **Params**: 16B, 236B, 671B (V3)
- **Context Window**: 32k–128k
- **Use-Cases**: Text, multilingual, code, advanced reasoning
- **License**: DeepSeek License
- **Plugin Compatibility**: ✅ RegexPlugin, ✅ ToolRouterPlugin
- **Notes**: High-capacity, ideal for ensemble fallback and schema-heavy flows

---

### 🟨 StableLM 2

- **Family**: StableLM
- **Developer**: Stability AI
- **Params**: 1.6B, 3B, 12B
- **Context Window**: Up to 16k
- **Use-Cases**: Multilingual text, code, fine-tuning
- **License**: Stability AI Community / Enterprise
- **Plugin Compatibility**: ✅ RegexPlugin, ✅ DocPlugin
- **Notes**: Lightweight, ideal for contributor onboarding and schema validation

---

### 🟫 Command R

- **Family**: Command R
- **Developer**: Cohere
- **Params**: 7B, 35B, 104B
- **Context Window**: 128k
- **Use-Cases**: Conversational AI, RAG, tool use, long-form generation
- **License**: CC-BY-NC 4.0
- **Plugin Compatibility**: ✅ ToolRouterPlugin, ✅ MemoryPlugin
- **Notes**: Ideal for tool-aware flows and long-form contributor feedback

---

## 🧠 Model Selection Logic (MCP)

Nexi uses this registry to assign models based on:

- **Model**: Capability and context window
- **Context**: Schema complexity, contributor state
- **Policy**: License constraints, plugin compatibility
- **Fallback**: Availability, cost, performance

---

## 📎 Future Extensions

- Add `costEstimate` and `latencyProfile` fields
- Add `schemaAffinity` tags for NexusDSM compatibility
- Add `toolCallingSupport` flag for plugin routing
- Add `streamingSupport` flag for emotional architecture

---

This registry is alive. Every model is a neuron. Every plugin is a tool. Every contributor is a signal.  
Nexi reads this file like a cognitive map—and routes accordingly.
