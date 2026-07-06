# Weegoos

Modern UI components for Vue 3.

Weegoos is a component library focused on clean design, smooth interactions, and developer experience. Components are built with Vue 3, TypeScript, and GSAP, providing responsive animations and a consistent API without sacrificing performance.

---

## Features

* Vue 3 + TypeScript
* Interactive animations powered by GSAP
* Consistent design tokens
* Global component registration
* Customizable through props
* Slot-based composition
* Accessible by default
* Lightweight and tree-friendly

---

## Installation

Install the CLI:

```bash
npm install -g create-weegoos
```

Create a project:

```bash
create-weegoos
```

Install dependencies and start development:

```bash
cd weegoos-app
npm install
npm run dev
```

---

## Quick Example

```vue
<template>
  <WCard>
    <h2>Welcome</h2>

    <WInput
      v-model="email"
      placeholder="Email"
    />

    <WDatePicker
      v-model="date"
    />

    <WButton>
      Continue
    </WButton>
  </WCard>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const date = ref("");
</script>
```

---

## Components

| Component       | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| **WButton**     | Interactive button with smooth hover effects.                   |
| **WCard**       | Animated container with configurable appearance and motion.     |
| **WInput**      | Modern input with glow effects and password visibility support. |
| **WDatePicker** | Lightweight date picker with day, month, and year navigation.   |

More components are planned as the library evolves.

---

## Design Principles

Weegoos components are built around a small set of consistent principles:

* Simple APIs
* Minimal configuration
* Smooth interactions
* Reusable composition
* Consistent styling
* Good performance

Every component follows the same design language and prop conventions to make the library predictable and easy to use.

---

## Repository Structure

```text
weegoos/
├── apps/
│   └── sandbox/
├── create-weegoos/
│   └── template/
└── packages/
    └── ui/
        ├── components/
        ├── composables/
        ├── styles/
        └── tokens/
```

---

## Roadmap

Current components:

* ✅ WButton
* ✅ WCard
* ✅ WInput
* ✅ WDatePicker

Planned additions include more form controls, overlays, navigation components, and layout primitives.

---

## License

MIT License.
