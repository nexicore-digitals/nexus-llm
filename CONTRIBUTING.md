# 🤝 Contributing to NexusLLM

Welcome, contributor! NexusLLM is a modular, plugin-ready execution shell for free LLMs. It powers Nexi’s cognitive cortex—routing models, assigning plugins, and teaching through schema-aware flows.

We believe in **reviewable code**, **expressive documentation**, and **modular cognition**. Every contribution should feel alive, teachable, and empowering.

---

## 🧠 What You Can Contribute

- 🧩 **New Plugins** — Add cognitive extensions (e.g., validators, explainers, tool routers)
- 🧠 **Model Wrappers** — Integrate new free/open LLMs into the router
- 📎 **Schema Logic** — Improve NexusDSM flows or validation heuristics
- 🛠️ **Routing Logic** — Enhance MCP (Model–Context–Policy) assignment
- 📚 **Docs & Examples** — Make onboarding and usage feel alive
- 🧪 **Tests** — Validate plugin behavior, model selection, and output normalization

---

## 📁 Repo Structure

```bash

/nexus-llm
├── README.md
├── LLMs.md
├── PLUGINS.md
├── CONTRIBUTING.md
├── LICENSE
├── /docs
│   ├── MCP.md
│   ├── SCHEMAS.md
│   ├── CONTRIBUTORS.md
│   ├── EXAMPLES.md
│   ├── ROADMAP.md
│   └── STYLEGUIDE.md
├── /src
│   ├── NexusLLM.ts
│   ├── /plugins
│   ├── /models
│   └── /utils

```

---

## 🧪 Dev Setup

```bash
git clone https://github.com/your-username/nexus-llm
cd nexus-llm
npm install
```

Use `index.ts` or `/examples` to test flows.

---

## 🧩 Plugin Interface

```ts
export interface Plugin {
  name: string
  run: (input: string, context?: any) => Promise<string>
}
```

Each plugin should be modular, teachable, and compatible with at least one model in `LLMs.md`.

---

## 🧠 Coding Philosophy

- Modular over monolithic
- Reviewer-friendly output (`suggestion`, `explainer`, `confidence`)
- Schema-aware flows
- Plugin chaining and fallback logic
- Expressive naming and teachable artifacts

---

## ✅ How to Submit

1. Fork the repo
2. Create a feature branch
3. Write clean, modular code
4. Add docs or examples if needed
5. Submit a pull request with a clear description

---

## 💬 Questions or Ideas?

Open an issue or start a discussion. Every idea is a neuron in Nexi’s brain.

Let’s build it modular, expressive, and alive.
