# 🧠 MCP: Model–Context–Policy Routing Logic

MCP is the cognitive routing engine of NexusLLM. It governs how Nexi selects models, assigns plugins, and adapts flows based on contributor state, schema complexity, and execution policy.

---

## 🔁 What is MCP?

--> **MCP = Model + Context + Policy**

Each request is evaluated through this triad:

* **Model**: Which LLM is best suited for the task?
* **Context**: What schema, contributor state, or plugin metadata is available?
* **Policy**: What constraints (license, cost, fallback, plugin compatibility) apply?

---

## 🧠 Model Selection

Nexi chooses models based on:

* Task type: `text`, `code`, `math`, `multilingual`, `tool use`
* Context window: `8k`, `32k`, `128k`, etc.
* License: `MIT`, `Apache`, `CC-BY-NC`, etc.
* Contributor preference: `preferredModel`, `skillLevel`, `reviewHistory`
* Fallback logic: If primary model fails, route to backup

Example:

```ts
if (task === "code" && context.schema === "NexusDSM.v1") {
  model = "phi3"
}
```

---

## 🔌 Plugin Assignment

Plugins are assigned based on:

* Schema affinity (e.g., `RegexPlugin` for field-level validation)
* Contributor state (e.g., `MemoryPlugin` for personalized flows)
* Model compatibility (from `PLUGINS.md`)
* Execution policy (e.g., fallback, chaining, cost)

Example:

```ts
if (model.supports("toolCalling") && context.tools.length > 0) {
  plugins.push("ToolRouterPlugin")
}
```

---

## 📎 Policy Layer

Policies define execution constraints:

* License restrictions (e.g., Command R is non-commercial)
* Cost thresholds (e.g., avoid high-token models for short prompts)
* Plugin compatibility (e.g., Gemini doesn’t support tool calling)
* Streaming support (e.g., Gemini Flash for emotional architecture)

---

## 🧪 MCP Trace Example

```ts
{
  model: "gemini",
  context: {
    schema: "NexusDSM.v1",
    contributor: "alice",
    tools: ["RegexTool", "DocExplainer"]
  },
  policy: {
    fallback: ["phi3", "mixtral"],
    license: "MIT",
    pluginCompatibility: true
  }
}
```

---

## 🧠 Nexi’s Role

Gemini 2.5 Flash acts as the **class prefect**—assigning models and plugins based on MCP logic. It reads `LLMs.md`, `PLUGINS.md`, and contributor metadata to orchestrate flows.

---

## 📎 Future Extensions

* Add `confidenceScore` for model selection
* Add `pluginAffinityScore` for plugin matching
* Add `streamingPreference` for emotional architecture
* Add `schemaComplexityIndex` for routing depth

---

MCP is the brainstem. It routes cognition. It adapts flows. It keeps Nexi alive.
