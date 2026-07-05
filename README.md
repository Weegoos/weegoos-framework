# ⚡ Weegoos

> **Next-generation UI for Vue 3 with hardware-accelerated interactions.**

Weegoos is a modern, minimalist UI framework for **Vue 3**, inspired by the design language of **Stripe** and **Linear**.

Built for developers who care about both aesthetics and performance, Weegoos delivers buttery-smooth animations, built-in 3D interactions, dynamic neon lighting, and physics-driven UI components—all out of the box.

Create beautiful, responsive, and high-performance web applications without sacrificing simplicity.

---

## ✨ Features

### ⚡ Premium UI/UX

- Minimal, modern design language
- Beautiful dark theme
- Carefully crafted typography
- Interactive neon glow effects
- Smooth micro-interactions

### 🛠 Monorepo Ecosystem

Weegoos is organized as a complete ecosystem:

- Core framework
- Optimized UI component library
- Powerful project scaffolding CLI
- Ready-to-use Vue 3 + Vite template

### 📐 Declarative Customization

Everything is configurable through Vue props.

- Magnetic button physics
- `borderRadius`
- Padding & spacing
- Interactive glow behavior
- Animation intensity

No custom JavaScript required.

### 🚀 Hardware-Accelerated Performance

Powered by **GSAP** for premium animations.

- GPU-accelerated rendering
- Smooth 60 FPS interactions
- No micro-stutters
- Highly optimized motion engine

---

# 📦 Getting Started

Install the CLI globally:

```bash
npm install -g create-weegoos
```

## Create a new project

Run the interactive installer:

```bash
create-weegoos
```

Follow the setup wizard, then start the development server:

```bash
cd weegoos-app
npm install
npm run dev
```

---

# 🚀 Components

All Weegoos components are registered globally, making them available anywhere in your application without additional imports.

## WCard

An interactive card component featuring:

- Cursor tracking
- Dynamic border glow
- Smooth 3D tilt
- Hardware-accelerated animations

```vue
<WCard>
  Beautiful interactive content
</WCard>
```

---

## WButton

A premium button with built-in magnetic physics.

Features include:

- Cursor attraction
- Spring-based movement
- Interactive glow
- Fully customizable behavior via props

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
│   └── sandbox/              # Local playground for UI development
│
├── create-weegoos/           # CLI project generator
│   └── template/             # Vue 3 + Vite starter template
│
└── packages/
    └── ui/                   # Core framework components & styles
```

---

# 🎯 Philosophy

Modern interfaces should feel **alive**.

Weegoos combines motion, depth, lighting, and responsive interactions into a lightweight, declarative framework that makes premium UI accessible with minimal effort.

Every component is designed to provide a polished user experience while maintaining excellent runtime performance.

---

# 📄 License

Released under the **MIT License**.

Feel free to use Weegoos in both personal and commercial projects.