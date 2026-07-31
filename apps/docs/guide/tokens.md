# Кастомизация токенов

Токены в **Weegoos** управляют двумя ключевыми аспектами интерфейса: визуальным стилем (цвета, шрифты, отступы) и физикой анимаций (кривые безье, длительность, задержки).

---

## 🎨 Цветовые токены

Weegoos использует расширенную палитру Tailwind CSS. Основной акцент сделан на неоновые и киберпанк-оттенки (Cyan & Emerald) с глубоким тёмным фоном.

### Конфигурация Tailwind (`tailwind.config.js`)

Чтобы переопределить или расширить палитру, добавьте токены в блок `theme.extend`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        weegoos: {
          bg: '#0d1117',
          surface: '#161b22',
          border: '#30363d',
          primary: '#06b6d4',   // Cyan
          secondary: '#10b981', // Emerald
          accent: '#a855f7',    // Purple
          text: '#f0f6fc',
          muted: '#8b949e',
        },
      },
    },
  },
  plugins: [],
};