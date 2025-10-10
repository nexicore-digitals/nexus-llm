# 🧠 NexusLLM Model Registry

This registry defines the cognitive landscape of NexusLLM—each model is a modular neuron in Nexi’s cortex. Models are grouped by family, annotated with metadata, and ready for plugin-aware orchestration.

---

## 📦 Model Schema

Each model entry follows this structure:

```ts
{
  name: "phi4",
  family: "Phi",
  developer: "Microsoft",
  params: ["15B"],
  contextWindow: ["16k", "128k"],
  useCases: ["text", "code", "math", "multilingual", "on-device", "RAG"],
  license: "Microsoft Research License",
  pluginCompatibility: ["RegexPlugin", "MemoryPlugin", "ToolRouterPlugin"],
  notes: "Fast, compact, ideal for validation and reasoning tasks",
  requiresToken: false, // if true, requires API key or local setup
  role: "generalist" // or "coder", "prefect", "summarizer", etc.
}
````

---

## 🧠 Registered Models

### 🟦 Phi-4

* **Family**: Phi
* **Developer**: Microsoft
* **Params**: 15B
* **Context Window**: 16k, 128k
* **Use-Cases**: General text, multilingual, code understanding, math reasoning, on-device inference, RAG
* **License**: Microsoft Research License
* **Plugin Compatibility**: ✅ Regex, ✅ Memory, ✅ ToolRouter
* **Notes**: Updated to 15B; ideal for reasoning-heavy local tasks and schema-aware validation

---

### 🟨 Gemini 2.5 Flash

* **Family**: Gemini
* **Developer**: Google
* **Params**: 2B, 9B, 27B
* **Context Window**: 128k
* **Use-Cases**: Summarization, QA, general text, code generation, RAG
* **License**: Gemini License
* **Plugin Compatibility**: ✅ DocPlugin, ✅ ExplainerPlugin
* **Notes**: Fastest responder; acts as MCP “prefect” for routing orchestration

---

### 🟪 StarCoder2

* **Family**: BigCode
* **Developer**: BigCode
* **Params**: 15B
* **Context Window**: 16k
* **Use-Cases**: Code generation, multi-language programming, instruction following
* **License**: Apache 2.0
* **Plugin Compatibility**: ✅ RegexPlugin, ✅ ExplainerPlugin
* **Notes**: Ideal for local coding flows, contributor review, and high-context completion tasks

---

### 🟩 DeepSeek R1

* **Family**: DeepSeek
* **Developer**: DeepSeek AI
* **Params**: 8B
* **Context Window**: 32k
* **Use-Cases**: Code generation, code understanding, general instruction following, reasoning
* **License**: DeepSeek License
* **Plugin Compatibility**: ✅ RegexPlugin, ✅ ToolRouterPlugin
* **Notes**: Efficient 4-bit quantized model for local deployment, instruction-following capable

---

### 🟫 DeepSeek V3

* **Family**: DeepSeek
* **Developer**: DeepSeek AI
* **Params**: 7B
* **Context Window**: 32k
* **Use-Cases**: Text, code, multilingual, advanced reasoning, RAG
* **License**: DeepSeek License
* **Plugin Compatibility**: ✅ RegexPlugin, ✅ ToolRouterPlugin
* **Notes**: Lightweight ensemble fallback model; efficient for local inference

---

### 🟧 Gemma 3-27B-IT

* **Family**: Gemma
* **Developer**: Google
* **Params**: 27B
* **Context Window**: 32k
* **Use-Cases**: Summarization, QA, general text, multilingual, long-form content, advanced reasoning
* **License**: Gemma License
* **Plugin Compatibility**: ✅ DocPlugin
* **Notes**: Ideal for high-context summarization and multilingual tasks

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

---

This version:

* Removes **Command R+** and **Mistral-7B**  
* Updates **Phi-4** to 15B  
* Adds **StarCoder2-15B** and both **DeepSeek local models**  
* Aligns **context windows**, **use-cases**, and **plugin compatibility**  
* Includes notes for quantization and local inference suitability  
* Formats consistently for easy parsing and future automation
