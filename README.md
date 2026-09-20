# ⚡ TOON Prompt Compressor

> **Shrink your prompts. Supercharge your LLM calls.**

A sleek web application that converts verbose natural language prompts into compact **TOON (Token-Oriented Object Notation)** format — typically saving 40–70% of tokens on LLM API calls.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?logo=tailwindcss)

---

## 🎯 What is TOON?

TOON is a compact notation for expressing LLM prompts using key-value pairs and aggressive text compression. It transforms verbose, human-friendly instructions into token-efficient formats that modern LLMs understand just as well.

### Example Transformation

**Input (142 chars, ~35 tokens):**
```
Could you please help me write a Python function that calculates the average of all values in a column, handling missing values efficiently?
```

**TOON Output (55 chars, ~14 tokens):**
```
r:exp;t:write py fn calc avg vals in col w/ NaN;c:brief,no_yap,exact
```

**That's a 61% reduction in characters and ~60% fewer tokens — with the same meaning.**

---

## ✨ Features

- 🔥 **Real-time compression** — Instantly convert verbose prompts to TOON format
- 📊 **Live statistics** — See character count, estimated token count, and compression ratio
- 📋 **One-click copy** — Copy compressed output to clipboard instantly
- 🎯 **Example prompts** — Try pre-built examples to see the compressor in action
- 🧠 **Multi-stage pipeline** — Phrase replacement → filler removal → telegraphic mode → word shortening
- 🎨 **Dark UI** — Glassmorphism design with animated gradients and smooth transitions
- 📱 **Fully responsive** — Works on desktop, tablet, and mobile
- 🛡️ **Code protection** — Code blocks, inline code, and URLs are preserved intact

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/prompt-in-toon.git
cd prompt-in-toon

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The optimized output will be in the `dist/` directory.

### Type Checking

```bash
npm run typecheck
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **TypeScript** | Type-safe development |
| **Vite 6** | Lightning-fast build tool |
| **Tailwind CSS 4** | Utility-first styling |
| **Lucide React** | Beautiful icon set |
| **CSS Animations** | Smooth transitions & effects |

---

## 📁 Project Structure

```
├── index.html              # Entry HTML file
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── public/                 # Static assets
└── src/
    ├── main.tsx            # React entry point
    ├── App.tsx             # Main application component
    ├── toon.ts             # TOON compression engine (core logic)
    └── index.css           # Global styles & animations
```

---

## 🧠 How TOON Compression Works

The compressor uses a **4-stage pipeline** to shrink prompts while preserving meaning:

### Stage 1: Phrase Replacement
Converts common verbose phrases to their concise equivalents:
| Verbose | TOON |
|---|---|
| "in order to" | "to" |
| "due to the fact that" | "because" |
| "at this point in time" | "now" |
| "in the event that" | "if" |
| "a large number of" | "many" |
| "in close proximity to" | "near" |

### Stage 2: Filler Removal
Strips conversational filler and polite padding:
- "please help me" → *(removed)*
- "could you" → *(removed)*
- "I would like you to" → *(removed)*
- "basically", "really", "actually", "just" → *(removed)*

### Stage 3: Telegraphic Mode
Removes pronouns, articles, and linking words:
- "the", "a", "an" → *(removed)*
- "is", "are", "was", "were" → *(removed)*
- "that", "which" → *(removed)*

### Stage 4: Word Shortening
Applies domain-specific abbreviations:
| Word | TOON | | Word | TOON |
|---|---|---|---|---|
| function | fn | | database | db |
| application | app | | configuration | cfg |
| parameter | param | | environment | env |
| implementation | impl | | generate | gen |
| calculate | calc | | variable | var |
| directory | dir | | repository | repo |
| message | msg | | request | req |

### Protected Content
The following are **never compressed**:
- Code blocks (```...```)
- Inline code (`...`)
- URLs (http://... and https://...)

---

## 📦 TOON Output Format

The compressed output follows the TOON structure:

```
r:exp;t:compressed_task;c:brief,no_yap,exact
```

| Key | Meaning | Purpose |
|---|---|---|
| `r:exp` | Role = Expert | Primes the model for higher-quality, expert-level responses |
| `t:...` | Task | Your compressed prompt — the actual instruction |
| `c:brief,no_yap,exact` | Constraints | Instructs the model to be concise, no filler, and precise |

---

## 💡 Benefits of Using TOON

### 💰 Can Reduce API Costs by 40–70%
LLM APIs charge per token. Compressing a 200-token prompt to 60 tokens directly reduces your costs on every API call where compression is effective.

### ⚡ Potentially Faster Response Times
Fewer input tokens means faster processing. Latency drops proportionally with input size, especially noticeable with large context windows.

### 🧠 LLMs Generally Understand Compressed Text
Modern LLMs are trained on code, abbreviations, and shorthand. They can often understand `fn calc avg vals in col` as well as the verbose version.

### 📐 More Room for Context
With smaller prompts, you can fit more relevant context, examples, and instructions within the model's context window.

### 🎯 Structured Output Format
TOON's `key:value;key:value` format gives models clear structural signals that can improve response precision.

### 🔌 Broad Compatibility
Works with most LLMs out of the box — GPT-4, Claude, Gemini, Llama, Mistral. No fine-tuning required.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

<p align="center">
  <strong>Reduce tokens. Save costs. Get faster LLM responses.</strong>
</p>