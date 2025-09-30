# 📎 NexusDSM & Schema-Aware Flows

Schemas are the cognitive scaffolding of NexusLLM. They define how Nexi interprets contributor input, assigns plugins, and generates reviewer-friendly output. NexusDSM is the default schema system—modular, teachable, and alive.

---

## 🧠 What is NexusDSM?

**NexusDSM (Domain Schema Metadata)** is a modular schema format used to:

- Validate contributor input
- Assign plugins based on field type
- Normalize output into reviewer-friendly suggestions
- Hydrate memory and personalize flows

Each schema is a living artifact—reviewable, extensible, and teachable.

---

## 🧩 Schema Structure

```ts
{
  schema: "NexusDSM.v1",
  fields: {
    email: {
      type: "string",
      required: true,
      pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
      plugin: "RegexPlugin",
      reviewerNote: "Ensure valid email format"
    },
    bio: {
      type: "text",
      required: false,
      plugin: "DocPlugin",
      reviewerNote: "Summarize clearly and avoid jargon"
    }
  }
}
```

---

## 🔌 Plugin Affinity

Plugins are assigned based on field metadata:

| Field Type | Plugin |
|------------|--------|
| `string` with `pattern` | `RegexPlugin` |
| `text` with `reviewerNote` | `ExplainerPlugin` |
| `object` with nested fields | `MemoryPlugin` |
| `tool[]` | `ToolRouterPlugin` |

---

## 🧪 Schema-Aware Flow Example

```ts
const schema = loadSchema("NexusDSM.v1")
const input = { email: "test@", bio: "I am a dev" }

const result = await agent.run(input, { schema })
```

Output:

```ts
{
  suggestion: "Use a valid email format like user@example.com",
  explainer: "Regex failed: expected '@' and domain",
  confidence: 0.92,
  reviewerNote: "Consider adding a fallback validator"
}
```

---

## 🧠 Schema Evolution

Schemas can evolve modularly:

- Add `confidenceThreshold` for plugin activation
- Add `reviewerNoteFormat` for output normalization
- Add `schemaComplexityIndex` for MCP routing
- Add `fieldAffinityScore` for plugin matching

---

## 📎 Future Extensions

- Support `NexusDSM.v2` with plugin chaining
- Add schema hydration from contributor memory
- Enable schema-aware fallback logic
- Add schema-to-prompt transformation layer

---

Schemas are cognition. They teach Nexi how to validate, explain, and personalize.  
Every schema is a neuron. Every field is a signal. Every plugin is a teacher.
