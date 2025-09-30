# 🧑‍💻 Contributor State & Personalization

NexusLLM adapts to contributors like a cognitive guide—personalizing flows, assigning plugins, and shaping output based on contributor metadata. This file defines how contributor state is stored, interpreted, and used across the system.

---

## 🧠 Why Contributor State Matters

Every contributor is unique. Their preferences, skill level, and review history shape:

- Plugin selection
- Model routing
- Schema hydration
- Reviewer feedback
- Memory traces

Nexi treats contributor state as a **living signal**—used to teach, guide, and personalize.

---

## 📎 Contributor Metadata Schema

```ts
{
  id: "alice",
  skillLevel: "intermediate",
  preferredModel: "phi3",
  reviewHistory: ["schema-validation", "tool-routing"],
  memory: {
    lastUsedPlugin: "RegexPlugin",
    lastSchema: "NexusDSM.v1"
  }
}
```

---

## 🔌 Plugin Assignment Based on Contributor State

| Metadata | Plugin Behavior |
|----------|-----------------|
| `skillLevel: beginner` | Add `ExplainerPlugin` for reviewer notes |
| `preferredModel: gemini` | Route to Gemini 2.5 Flash for fast feedback |
| `reviewHistory: includes 'tool-routing'` | Enable `ToolRouterPlugin` |
| `memory.lastUsedPlugin` | Suggest same plugin for continuity |

---

## 🧪 Personalized Flow Example

```ts
const contributor = getContributor("alice")

const agent = new NexusLLM({
  model: contributor.preferredModel,
  plugins: assignPlugins(contributor),
  context: { contributor }
})

await agent.run("Validate this input")
```

---

## 🧠 MemoryPlugin Role

The `MemoryPlugin` hydrates flows with contributor state:

- Adds reviewer notes from past sessions
- Suggests plugins based on usage history
- Personalizes schema validation
- Enables continuity across sessions

---

## 📎 Future Extensions

- Add `learningGoals` to guide plugin selection
- Add `emotionalState` for tone adaptation
- Add `schemaAffinityScore` for routing depth
- Add `reviewerStyle` for output formatting

---

Contributors are not just users—they’re signals.  
Nexi listens, adapts, and teaches based on who they are.
