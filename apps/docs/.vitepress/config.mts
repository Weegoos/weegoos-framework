import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Weegoos',
  description: 'High-performance Vue 3 & GSAP Framework',
  themeConfig: {
    logo: '/logo.svg', // Замени на свой логотип при наличии
    nav: [
      { text: 'Руководство', link: '/guide/' },
      { text: 'Компоненты', link: '/components/' },
      { text: 'v0.1.0', link: '#' }
    ],
    sidebar: [
      {
        text: 'Основное',
        items: [
          { text: 'Введение', link: '/guide/' },
          { text: 'Быстрый старт', link: '/guide/getting-started' },
          { text: 'Кастомизация токенов', link: '/guide/tokens' }
        ]
      },
      {
        text: 'Компоненты',
        items: [
          { text: 'Архитектура и структура', link: '/components/' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Weegoos/weegoos-framework' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Weegoos'
    }
  }
});