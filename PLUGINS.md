# 🔌 NexusLLM Plugin Registry

This registry defines the modular cognitive extensions available to NexusLLM. Each plugin adds teachable, reviewable capabilities to Nexi’s cortex.

---

## 🧩 Plugin Schema

```ts
{
  name: "RegexPlugin",
  role: "Validates input using schema-aware regex patterns",
  compatibleModels: ["phi3", "mixtral", "starcoder2"],
  contextRequired: false,
  outputFormat: "Annotated prompt or reviewer note",
  notes: "Ideal for field-level validation and onboarding flows"
}
```

---

## 🔌 Registered Plugins

### ✅ RegexPlugin

- **Role**: Validates fields using regex logic
- **Compatible Models**: Phi-3, Mixtral, StarCoder2
- **Context Required**: ❌
- **Output Format**: Annotated prompt or reviewer note
- **Notes**: Ideal for contributor input validation and schema hydration

---

### ✅ DocPlugin

- **Role**: Injects documentation hints or schema context
- **Compatible Models**: Gemini, Gemma, Falcon
- **Context Required**: ✅ (NexusDSM or contributor state)
- **Output Format**: Prompt enrichment
- **Notes**: Ideal for onboarding, schema explanation, and contributor guidance

---

### ✅ MemoryPlugin

- **Role**: Adds contributor state or review history
- **Compatible Models**: Phi-3, Qwen2.5, Command R
- **Context Required**: ✅ (Contributor profile)
- **Output Format**: Hydrated prompt with memory trace
- **Notes**: Ideal for personalized flows and reviewer continuity

---

### ✅ ExplainerPlugin

- **Role**: Appends reviewer-style notes to output
- **Compatible Models**: StarCoder2, Gemini, Falcon
- **Context Required**: ❌
- **Output Format**: `{ explainer: string }`
- **Notes**: Ideal for schema validation, contributor feedback, and teachable outputs

---

### ✅ ToolRouterPlugin

- **Role**: Enables tool awareness and execution hooks
- **Compatible Models**: Mixtral, Yi, DeepSeek, Command R
- **Context Required**: ✅ (Tool metadata)
- **Output Format**: Prompt injection or tool call trace
- **Notes**: Ideal for schema-aware flows, external validation, and plugin chaining

---

## 🧠 Plugin Assignment Logic (MCP)

Nexi uses this registry to assign plugins based on:

- **Model compatibility**
- **Schema complexity**
- **Contributor state**
- **Execution policy**
- **Fallback logic**

---

## 📎 Future Extensions

- Add `costImpact` and `latencyProfile` fields
- Add `schemaAffinity` tags for NexusDSM
- Add `toolCallingSupport` flag for plugin chaining
- Add `reviewerNoteFormat` for output normalization

---

This registry is alive. Every plugin is a neuron. Every model is a classmate. Gemini is the prefect.  
Nexi reads this file like a cognitive map—and routes accordingly.
