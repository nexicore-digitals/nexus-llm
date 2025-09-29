# ✍️ Nexicore Style Guide

This guide defines how to write modular, reviewer-friendly, and cognitively alive artifacts for NexusLLM and Nexi. It applies to documentation, plugin output, schema notes, and contributor-facing flows.

Every word is a neuron. Every sentence is a signal. Every doc is alive.

---

## 🧠 Core Principles

- **Modular**: Break content into skimmable, reusable blocks
- **Expressive**: Use vivid, teachable language that invites understanding
- **Reviewer-Centric**: Output should guide, not just inform
- **Schema-Aware**: Align structure with field types, plugin logic, and contributor state
- **Alive**: Every artifact should feel like it’s teaching, adapting, and evolving

---

## 📚 Documentation Style

| Element | Style |
|--------|-------|
| Headings | Use emojis + active phrasing (`🧠 How Nexi Routes`) |
| Lists | Use bullets for clarity, short sentences for skimmability |
| Tables | Use for plugin mapping, schema affinity, or comparisons |
| Code Blocks | Always include input + output examples |
| Tone | Friendly, intentional, and reviewer-aware |

---

## 🔌 Plugin Output Format

```ts
{
  suggestion: "Clarify your bio with specific skills",
  explainer: "Avoid vague phrases like 'I am a dev'",
  confidence: 0.91,
  reviewerNote: "Use action verbs and tech stack references"
}
```

Each plugin should return output that is:

- Modular
- Reviewer-friendly
- Schema-aware
- Teachable

---

## 🧩 Schema Notes

Use `reviewerNote` to guide contributors:

```ts
bio: {
  type: "text",
  plugin: "DocPlugin",
  reviewerNote: "Summarize clearly and avoid jargon"
}
```

---

## 🧠 Contributor-Facing Language

- Use “you” and “your” to personalize
- Avoid jargon unless explained
- Use metaphors when teaching (e.g., “Every plugin is a neuron”)
- Respect contributor agency—suggest, don’t command

---

## 📎 README & LICENSE Style

- README should feel alive—modular, inviting, and teachable
- LICENSE should reflect philosophy, not just legality
- Use cognitive metaphors to explain boundaries and flows

---

## 💬 Reviewer Style Variants

| Style | Description |
|-------|-------------|
| `modular` | Skimmable blocks, plugin hints, schema traces |
| `concise` | Short suggestions, minimal explanation |
| `verbose` | Full reasoning, fallback logic, plugin chaining |
| `emotional` | Tone-aware, memory hydration, pacing hints |

---

Every doc is a neuron.  
Every plugin is a teacher.  
Every contributor is a signal.
