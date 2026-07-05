# ⚡ Weegoos

> **Next-generation UI framework for Vue 3 with hardware-accelerated interactions.**

Weegoos is a modern UI framework for **Vue 3**, inspired by the visual language of **Stripe**, **Linear**, and contemporary design systems.

Instead of providing static components, Weegoos delivers a collection of **interactive UI primitives** powered by physics-based animations, GPU-accelerated rendering, and a flexible design token system.

Every component is built with motion, depth, lighting, and customization in mind—without sacrificing performance or developer experience.

---

# ✨ Features

### 🎨 Design System

- Built-in design tokens
- Presets (`default`, `glass`, `solid`, `elevated`, `minimal`, `neon`)
- Color palette system
- Radius, spacing and elevation scales
- Consistent styling across the framework

---

### ⚡ Interactive Components

Every component is designed to feel alive.

- Hardware-accelerated 3D tilt
- Dynamic cursor-based glow
- Physics-driven interactions
- Smooth hover transitions
- GPU-optimized rendering

---

### 📐 Declarative Customization

Customize components directly through Vue props.

- Layout
- Colors
- Shadows
- Borders
- Glow
- Motion
- Perspective
- Hover behavior

No custom CSS or JavaScript required for common use cases.

---

### 🧩 Flexible Composition

Components support:

- Named slots
- Global registration
- Custom HTML elements via `as`
- Event forwarding
- Programmatic API with `defineExpose`

---

### 🚀 Built for Performance

Powered by **GSAP**.

- Hardware acceleration
- Smooth animations
- Optimized transforms
- Reduced layout thrashing
- Built-in `prefers-reduced-motion` support

---

# 📦 Installation

Install the CLI globally:

```bash
npm install -g create-weegoos
```

Create a new project:

```bash
create-weegoos
```

Start development:

```bash
cd weegoos-app
npm install
npm run dev
```

---

# 🚀 Components

All Weegoos components are automatically registered globally.

No manual imports are required.

---

# WCard

`WCard` is an interactive container component designed for modern interfaces.

It combines a design-token system with hardware-accelerated animations, customizable presets, and declarative interaction controls.

---

## Basic Usage

```vue
<WCard>
  Beautiful interactive content
</WCard>
```

---

## Presets

Choose from six built-in visual styles.

```vue
<WCard preset="default" />
<WCard preset="glass" />
<WCard preset="solid" />
<WCard preset="elevated" />
<WCard preset="minimal" />
<WCard preset="neon" />
```

---

## Design Tokens

Quickly customize the component using framework tokens.

```vue
<WCard
    size="lg"
    radius="xl"
    color="primary"
    elevation="lg"
/>
```

Supported tokens:

| Prop | Values |
|------|--------|
| `preset` | `default` `glass` `solid` `elevated` `minimal` `neon` |
| `size` | `sm` `md` `lg` |
| `radius` | `sm` `md` `lg` `xl` |
| `elevation` | `none` `sm` `md` `lg` |

---

## Advanced Customization

Every design token can be overridden.

```vue
<WCard
    width="420"
    height="260"

    background="#13141c"

    border-color="#2b2b2b"

    border-width="2"

    padding="32px"

    border-radius="20px"
/>
```

---

## Motion

Interactive behavior is configurable through props.

```vue
<WCard
    :tilt="true"
    :max-tilt="15"
    :perspective="1200"

    :scale-on-hover="true"
    :hover-scale="1.03"
/>
```

---

## Glow

Enable cursor-reactive glow.

```vue
<WCard
    glow
    glow-color="#00DC82"
    :glow-size="500"
    :glow-opacity=".5"
    glow-blur="24px"
/>
```

---

## Shadow

```vue
<WCard
    shadow
/>

<WCard
    shadow="0 20px 80px rgba(0,0,0,.35)"
/>
```

---

## Layout Slots

Structured layouts are supported out of the box.

```vue
<WCard>

    <template #header>
        Header
    </template>

    Content

    <template #footer>
        Footer
    </template>

</WCard>
```

---

## Custom Glow Slot

Replace the built-in glow renderer.

```vue
<WCard>

    <template #glow="{ x, y, isHovered }">

        <!-- Custom glow implementation -->

    </template>

</WCard>
```

Slot props:

| Property | Description |
|----------|-------------|
| `x` | Cursor X position |
| `y` | Cursor Y position |
| `isHovered` | Hover state |

---

## Events

```vue
<WCard
    @mouseenter="..."
    @mouseleave="..."
    @mousemove="..."
/>
```

---

## Exposed Methods

```ts
const card = ref()

card.value.reset()

card.value.tiltTo(10, 5)

card.value.focus()

card.value.element
```

| Method | Description |
|---------|-------------|
| `reset()` | Restores the default transform |
| `tiltTo(x, y)` | Programmatically rotates the card |
| `focus()` | Focuses the root element |
| `element` | Returns the underlying DOM element |

---

## Accessibility

Weegoos respects the user's system preferences.

- Supports `prefers-reduced-motion`
- Touch interaction support
- Optional interaction disabling
- Custom HTML element rendering via `as`

---

# WButton

A premium button component featuring:

- Magnetic cursor attraction
- Spring-based movement
- Interactive glow
- Hardware-accelerated animations
- Declarative customization

```vue
<WButton>
    Get Started
</WButton>
```

---

# 🏗 Repository Structure

```text
weegoos/
├── apps/
│   └── sandbox/
│
├── create-weegoos/
│   └── template/
│
└── packages/
    └── ui/
        ├── components/
        ├── composables/
        ├── tokens/
        └── styles/
```

---

# 🎯 Philosophy

Weegoos treats UI components as **interactive primitives**, not static elements.

Each component combines:

- Design tokens
- Motion
- Physics
- Lighting
- Accessibility
- Performance

The goal is to provide an expressive developer experience while maintaining production-grade rendering performance.

---

# 📄 License

Released under the **MIT License**.

You are free to use Weegoos in both personal and commercial projects.