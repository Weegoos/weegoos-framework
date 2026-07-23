# Weegoos

Modern, high-performance Vue 3 component library powered by GSAP animations and Tailwind CSS.

Weegoos is designed for building fast, beautiful, and interactive user interfaces. It combines modular UI components with safe SSR-compatible animation helpers and isolated styles.

---

## Architecture & Packages

This repository is managed as a monorepo containing the following packages:

- **`@weegoos/ui`** — Vue 3 UI components, design tokens, and isolated Tailwind CSS styles (`wg-` prefix).
- **`@weegoos/core`** — GSAP animation helpers, timeline managers, and SSR guards for Nuxt/VitePress.
- **`create-weegoos`** — CLI tool for scaffolding new Weegoos projects.

---

## Features

- **Vue 3 + TypeScript** — Fully typed components with auto-generated `.d.ts` declarations.
- **GSAP Integration** — Built-in animation utilities with automatic memory cleanup via `gsap.context()`.
- **Isolated Styling** — Zero CSS conflicts thanks to class prefixing (`wg-`) and a custom Tailwind plugin.
- **SSR Safe** — Ready for Server-Side Rendering (Nuxt 3, VitePress).
- **Design Tokens** — Configurable themes, colors, spacing, and motion defaults.
- **Tree-shakeable** — Import only what you use (ESM & UMD builds).

---

# Quick Start

## 1. Create a New Project

```bash
npx create-weegoos my-app

cd my-app

pnpm install

pnpm dev
```

## 2. Manual Installation

Install the packages inside an existing Vue 3 project.

```bash
pnpm add @weegoos/ui @weegoos/core
```

Import the global styles:

```ts
import '@weegoos/ui/dist/style.css';
```

---

# Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  WCard,
  WButton,
  WInput,
  WDatePicker,
  WBadge
} from '@weegoos/ui'

const email = ref('')
const date = ref('')
</script>

<template>
  <WCard class="max-w-md mx-auto p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold">
        Welcome to Weegoos
      </h2>

      <WBadge variant="success">
        Active
      </WBadge>
    </div>

    <WInput
      v-model="email"
      class="mb-3"
      placeholder="Enter your email"
    />

    <WDatePicker
      v-model="date"
      class="mb-4"
    />

    <WButton
      block
      variant="primary"
    >
      Continue
    </WButton>
  </WCard>
</template>
```

---

# Available Components

| Component | Description |
|------------|-------------|
| `WButton` | Interactive button with customizable variants and smooth hover effects. |
| `WCard` | Animated container supporting design tokens and multiple presets. |
| `WInput` | Modern input component with focus animations and validation support. |
| `WDatePicker` | Date picker with month/year navigation and customizable formatting. |
| `WBadge` | Compact status badge for labels, notifications, and counters. |
| `WCalendar` | Interactive calendar grid for date selection and event management. |

---

# Repository Structure

```text
weegoos/
├── apps/
│   └── sandbox/          # Local playground & development environment
│
├── create-weegoos/       # CLI starter template
│
└── packages/
    ├── core/             # GSAP helpers, timelines & SSR guards (@weegoos/core)
    └── ui/               # UI components, design tokens & styles (@weegoos/ui)
```

---

# Contributing

Clone the repository:

```bash
git clone https://github.com/weegoos/weegoos-framework.git

cd weegoos
```

Install dependencies:

```bash
pnpm install
```

Build every package:

```bash
pnpm --recursive build
```

Run the development sandbox:

```bash
pnpm --filter sandbox dev
```

---

# Versioning

This project uses **@changesets/cli** for package versioning.

Create a new changeset:

```bash
pnpm changeset
```

---

# License

MIT