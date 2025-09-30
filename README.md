# 🧠 NexusLLM

![Build Status](https://img.shields.io/github/actions/workflow/status/nexicore-digitals/nexus-llm/main.yml)
![Version](https://img.shields.io/github/package-json/v/nexicore-digitals/nexus-llm)
![Nexicore License](https://img.shields.io/badge/Nexicore-License%20Protected-red.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)
![Open Source Love](https://img.shields.io/badge/Open%20Source-%F0%9F%92%96-blue.svg)
![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-blue.svg)
![Modular](https://img.shields.io/badge/Modular-Plugin%20Ready-purple.svg)
![LLM Router](https://img.shields.io/badge/LLM-Router%20Core-orange.svg)
![Gemini Prefect](https://img.shields.io/badge/Gemini-2.5%20Flash%20Prefect-lightgrey.svg)
![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
![ESLint](https://img.shields.io/badge/lint-eslint-blue)
![Vitest](https://img.shields.io/badge/tested_with-vitest-6E9FDC.svg)
![Husky](https://img.shields.io/badge/precommit-hooks%20via&mdash;%20husky-8E44AD.svg)
![Lint Staged](https://img.shields.io/badge/lint-staged%20files-3498DB.svg)

**Modular LLM execution shell with plugin support.**  
Routes free and open LLMs like Gemini, Mixtral, Phi-2/3, StarCoder2, Yi, and more—abstracting LiteLLM into a plugin-ready cognitive cortex for Nexi.

---

## ✨ What is NexusLLM?

NexusLLM is the foundational brainstem of Nexi—a modular, schema-aware agentic shell that:

- 🧠 Selects and routes LLMs based on context, schema, or contributor state
- 🔌 Hosts plugins for regex validation, documentation injection, memory hydration, and tool routing
- 📎 Normalizes output into reviewer-friendly formats (`suggestion`, `explainer`, `confidence`)
- 🧩 Abstracts LiteLLM while remaining compatible with direct model APIs
- 🛠️ Supports free LLMs across families: Mistral, Meta, Microsoft, Google, Stability, Cohere, BigCode, DeepSeek, and more

See [docs/MCP.md](./docs/MCP.md) for routing logic and [docs/SCHEMAS.md](./docs/SCHEMAS.md) for schema-aware flows.

---

## 🧠 NexusLLM Architecture (Classroom Metaphor)

| Role | Cognitive Function |
|------|--------------------|
| **Gemini 2.5 Flash** | Class prefect—fast, context-aware, assigns tools and routes models |
| **Other LLMs (Mixtral, Phi-3, Yi, etc.)** | Classmates—specialized in code, math, multilingual, etc. |
| **Plugins (Regex, Doc, Memory, ToolRouter)** | Teaching aids—used by prefect to guide, validate, explain |
| **MCP Logic** | School policy—Model–Context–Policy rules for orchestration |
| **Contributor State** | Student profile—used to personalize flows and plugin selection |

---

## 🧪 Development Setup

```bash
npm install
npm run format       # Format code with Prettier
npm run lint         # Lint code with ESLint
npm run test         # Run tests with Vitest
npm run test:watch   # Watch mode for live feedback
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/nexicore-digitals/nexus-llm
cd nexus-llm
npm install
```

```ts
import { NexusLLM } from './src/NexusLLM'
import { RegexPlugin, DocPlugin } from './src/plugins'

const agent = new NexusLLM({
  models: ['gemini', 'mixtral', 'phi3'],
  plugins: [RegexPlugin, DocPlugin],
  defaultModel: 'phi3',
})

const result = await agent.run("Validate this schema: { email: 'test@' }")
console.log(result)
```

---

## 🔌 Plugin System

Plugins are modular cognitive extensions. Each plugin can:

- Inject metadata or schema hints
- Validate or transform prompts
- Annotate responses with reviewer notes
- Route external tools or APIs

See [docs/EXAMPLES.md](./docs/EXAMPLES.md) for real-world flows.

### Default Plugins

| Plugin | Role |
|--------|------|
| `RegexPlugin` | Validates fields using regex logic |
| `DocPlugin` | Injects documentation or schema context |
| `MemoryPlugin` | Adds contributor state or review history |
| `ExplainerPlugin` | Appends reviewer-style notes |
| `ToolRouterPlugin` | Enables tool awareness and execution hooks |

---

## 🧠 Supported Models

NexusLLM routes across a growing ecosystem of free and open LLMs:

| Family | Models | License |
|--------|--------|---------|
| **Meta** | Llama 3 (1B–405B) | Llama Community License |
| **Mistral AI** | Mixtral, Mistral | Apache 2.0 / Commercial |
| **Microsoft** | Phi-2, Phi-3, Phi-4 | Microsoft Research License |
| **Google** | Gemma 2 | Gemma License |
| **TII** | Falcon 3 | TII Falcon License |
| **BigCode** | StarCoder2 | Apache 2.0 |
| **01.AI** | Yi | Apache 2.0 |
| **Alibaba** | Qwen2.5 | Apache 2.0 / Qwen License |
| **DeepSeek AI** | DeepSeek V2/V3 | DeepSeek License |
| **Stability AI** | StableLM 2 | Stability AI License |
| **Cohere** | Command R | CC-BY-NC 4.0 |

---

## 📎 Output Format

Every response is normalized into a reviewer-friendly structure:

```ts
{
  suggestion: "Use a valid email format like user@example.com",
  explainer: "Regex failed: expected '@' and domain",
  confidence: 0.92,
  reviewerNote: "Consider adding a fallback validator"
}
```

---

## 🔐 Premium & Contributor Access

To unlock advanced flows (plugin chaining, schema-aware routing, memory hydration), you must:

- Provide an API key (required for all users)
- Either:
  - Create an account and upgrade to premium
  - Be listed in [CONTRIBUTORLIST.md](./CONTRIBUTORLIST.md) with `secretBadge: true`

See [LICENSE.nexicore.md](./LICENSE.nexicore.md) for orchestration boundaries.

---

## 🧼 Pre-commit Formatting

NexusLLM uses [Husky](https://typicode.github.io/husky/#/) and [lint-staged](https://github.com/okonet/lint-staged) to enforce formatting and linting before every commit.

```bash
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

### Pre-commit Tasks

- ✅ Format staged `.ts` files with Prettier
- ✅ Lint staged `.ts` files with ESLint
- ✅ Prevent commits that violate style or cognitive clarity

See `.lintstagedrc` and `.husky/pre-commit` for config.

---

## 🤝 Contributing

NexusLLM is modular by design. You can:

- Add new plugins (`/src/plugins`)
- Extend model wrappers (`/src/models`)
- Improve routing logic (`NexusLLM.ts`)
- Submit examples or docs (`/examples`, `/docs`)

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines and [docs/STYLEGUIDE.md](./docs/STYLEGUIDE.md) for writing modular, reviewer-friendly artifacts.

Pull requests welcome. Every artifact should feel **teachable, reviewable, and alive**.

---

## 🛣️ Roadmap

See [docs/ROADMAP.md](./docs/ROADMAP.md) for upcoming milestones including:

- Nexi-as-a-service
- Contributor onboarding UI
- Plugin registry with access control
- Streaming support and emotional architecture

---

## 🛡 License

- [MIT License](./LICENSE) — for core modules, plugins, and wrappers
- [Nexicore License](./LICENSE.nexicore.md) — for orchestration logic, contributor registry, and premium flows

---

## 💬 Questions or Ideas?

Open an issue, start a discussion, or [request contributor access](https://github.com/nexicore-digitals/nexus-llm/issues/new?template=contributor-request.md).

Every idea is a neuron. Every contributor is a signal.  
Let’s build it modular, ethical, and alive.
