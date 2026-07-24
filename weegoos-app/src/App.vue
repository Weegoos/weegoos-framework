<script setup lang="ts">
import TopBanner from './components/molecules/TopBanner.vue'
import AppHeader from './components/molecules/AppHeader.vue'
import HeroSection from './components/organisms/HeroSection.vue'
import ShowcaseGrid from './components/organisms/ShowcaseGrid.vue'
</script>

<template>
  <div class="wg-landing">
    <!-- Фоновые интерактивные сетки и засветы -->
    <div class="bg-grid"></div>
    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>

    <!-- 1. Топ-баннер (новое добавление сверху) -->
    <TopBanner />

    <!-- 2. Навигационная шапка -->
    <AppHeader />

    <!-- 3. Главный экран -->
    <HeroSection />

    <!-- 4. Сетка возможностей фреймворка -->
    <ShowcaseGrid />
  </div>
</template>

<style>
/* Глобальный сброс для приложения */
body {
  margin: 0;
  padding: 0;
  background-color: #060709;
  color: #ffffff;
  font-family: 'Inter', 'Geist', -apple-system, sans-serif;
  overflow-x: hidden;
}

.wg-landing {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Эффект футуристичной сетки */
.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center top;
  mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}

/* Неоновые градиенты заднего плана */
.bg-glow-1 {
  position: absolute;
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 220, 130, 0.08) 0%, transparent 80%);
  pointer-events: none;
  z-index: 0;
}

.bg-glow-2 {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-80%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(129, 140, 248, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}
</style>