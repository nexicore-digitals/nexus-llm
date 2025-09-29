# 🧪 NexusLLM Usage Examples

This file showcases real-world examples of how NexusLLM orchestrates cognition—routing models, assigning plugins, and adapting flows based on schema, contributor state, and execution policy.

Each example is modular, teachable, and alive.

---

## 🧠 1. Schema Validation with Plugin Assignment

```ts
const input = {
  email: "test@",
  bio: "I am a dev"
}

const schema = loadSchema("NexusDSM.v1")

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

## 🔌 2. Plugin Chaining for Reviewer Feedback

```ts
const agent = new NexusLLM({
  model: "gemini",
  plugins: ["RegexPlugin", "ExplainerPlugin", "ReviewerPlugin"]
})

await agent.run("Validate this contributor input")
```

Output:

```ts
{
  suggestion: "Clarify your bio with specific skills",
  explainer: "Avoid vague phrases like 'I am a dev'",
  reviewerNote: "Use action verbs and tech stack references"
}
```

---

## 🧠 3. Contributor-Aware Routing

```ts
const contributor = {
  id: "owen",
  preferredModel: "gemini",
  skillLevel: "advanced",
  secretBadge: true
}

const agent = new NexusLLM({ contributor })

await agent.run("Summarize this plugin logic")
```

Output:

```ts
{
  summary: "This plugin validates field-level patterns using regex",
  reviewerStyle: "modular",
  pluginAffinity: ["RegexPlugin", "SchemaExplainer"]
}
```

---

## 🔁 4. Fallback Model Logic

```ts
const agent = new NexusLLM({
  model: "command-r",
  fallback: ["phi3", "mixtral"]
})

await agent.run("Explain this schema")
```

If Command R fails, Nexi routes to fallback model and logs trace:

```ts
{
  fallbackUsed: "phi3",
  reason: "Tool calling unsupported",
  trace: "Rerouted via MCP policy"
}
```

---

## 🔐 5. Premium Flow with Memory Hydration

```ts
const contributor = {
  id: "alice",
  secretBadge: true,
  memory: {
    lastUsedPlugin: "DocPlugin",
    lastSchema: "NexusDSM.v1"
  }
}

const agent = new NexusLLM({ contributor })

await agent.run("Validate this onboarding doc")
```

Output:

```ts
{
  suggestion: "Add a reviewer note to the 'bio' field",
  memoryTrace: "Last used DocPlugin for schema validation",
  pluginAffinity: ["DocPlugin", "ReviewerPlugin"]
}
```

---

These examples are neurons in Nexi’s brain—modular, expressive, and reviewable.
