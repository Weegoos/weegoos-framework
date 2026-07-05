<template>
  <div class="wg-landing">
    <!-- Фоновая интерактивная сетка и засветы -->
    <div class="bg-grid"></div>
    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>

    <!-- Навигация -->
    <header class="wg-navbar">
      <div class="nav-logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00dc82" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        <span>weegoos</span>
      </div>
      <nav class="nav-links">
        <a href="#" class="active">Docs</a>
        <a href="#">Components</a>
        <a href="#">Showcase</a>
      </nav>
      <div class="nav-actions">
        <span class="version-badge">v1.0.0</span>
      </div>
    </header>

    <!-- Главный экран (Hero Section) -->
    <main class="wg-hero">
      <div class="hero-badge">
        <span class="badge-text">Introducing Weegoos Core</span>
      </div>
      
      <h1 class="hero-title">
        Интерфейсы нового поколения.<br />
        <span class="text-gradient">С аппаратным ускорением.</span>
      </h1>
      
      <p class="hero-subtitle">
        Минималистичный дизайн-фреймворк для Vue 3, вдохновленный эстетикой Stripe и Linear. 
        Невероятная плавность, встроенный 3D-tilt и физика движений из коробки.
      </p>

      <div class="hero-buttons">
        <!-- Твоя глобальная кнопка WButton с передачей числа через двоеточие -->
        <WButton magnetic :radius="100">
          Начать разработку
        </WButton>
        <a href="#" class="btn-secondary">
          Документация
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    </main>

    <!-- Сетка компонентов (Showcase Grid) -->
    <section class="wg-grid-section">
      <div class="cards-showcase">
        
        <!-- Кастомная интерактивная карточка WCard -->
        <WCard 
          width="100%" 
          height="240px"
          background="#0f0926"
          borderColor="rgba(129, 140, 248, 0.15)"
          hoverBorderColor="#818cf8"
          borderRadius="16px"
          glowColor="rgba(129, 140, 248, 0.25)"
          padding="28px"
        >
          <div class="showcase-card-inner">
            <div class="card-tag purple-tag">Performance</div>
            <h3>GSAP Интеграция</h3>
            <p>Плавные интерактивные анимации с контролем частоты кадров. Никаких микрофризов.</p>
            <div class="card-footer-meta text-purple">computed_signals.log</div>
          </div>
        </WCard>

        <!-- Стандартная брендовая карточка WCard -->
        <WCard 
          width="100%" 
          height="240px"
          background="#0d1511"
          borderColor="rgba(0, 220, 130, 0.15)"
          hoverBorderColor="#00dc82"
          borderRadius="16px"
          glowColor="rgba(0, 220, 130, 0.2)"
          padding="28px"
        >
          <div class="showcase-card-inner">
            <div class="card-tag green-tag">Design System</div>
            <h3>Токены Weegoos</h3>
            <p>Гибкое управление радиусами, паддингами и неоновым свечением напрямую через пропсы.</p>
            <div class="card-footer-meta text-green">weegoos.config.ts</div>
          </div>
        </WCard>

      </div>
    </section>
  </div>
</template>

<script setup>
// Компоненты WButton и WCard зарегистрированы глобально плагином, скрипт чист!
</script>

<style>
/* Сброс базовых стилей для лендинга */
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

/* Эффект футуристичной сетки на бэкграунде */
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

/* Мягкие неоновые градиенты на заднем плане */
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

/* Шапка (Navbar) */
.wg-navbar {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.03em;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  color: #8a8f98;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.nav-links a:hover, .nav-links a.active {
  color: #ffffff;
}

.version-badge {
  font-size: 11px;
  font-family: monospace;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: #8a8f98;
}

/* Главный блок лендинга */
.wg-hero {
  position: relative;
  z-index: 5;
  max-width: 800px;
  text-align: center;
  margin-top: 110px;
  padding: 0 24px;
}

.hero-badge {
  display: inline-flex;
  background: rgba(0, 220, 130, 0.06);
  border: 1px solid rgba(0, 220, 130, 0.15);
  padding: 6px 14px;
  border-radius: 100px;
  margin-bottom: 24px;
}

.badge-text {
  font-size: 12px;
  color: #00dc82;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin: 0 0 24px 0;
}

.text-gradient {
  background: linear-gradient(135deg, #ffffff 30%, #a3a3a3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 18px;
  color: #8a8f98;
  line-height: 1.6;
  margin: 0 0 40px 0;
  font-weight: 400;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  transition: opacity 0.2s ease;
}

.btn-secondary:hover {
  opacity: 0.8;
}

/* Сетка демонстрации возможностей компонентов */
.wg-grid-section {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 900px;
  margin-top: 90px;
  padding: 0 24px 80px 24px;
  box-sizing: border-box;
}

.cards-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.showcase-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.card-tag {
  align-self: flex-start;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 8px;
  border-radius: 4px;
}

.purple-tag {
  color: #818cf8;
  background: rgba(129, 140, 248, 0.08);
}

.green-tag {
  color: #00dc82;
  background: rgba(0, 220, 130, 0.08);
}

.showcase-card-inner h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 14px 0 6px 0;
  letter-spacing: -0.02em;
}

.showcase-card-inner p {
  font-size: 13px;
  color: #8a8f98;
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
}

.card-footer-meta {
  font-family: monospace;
  font-size: 11px;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  padding-top: 14px;
  margin-top: 14px;
}

.text-purple { color: #4f46e5; }
.text-green { color: #008751; }

@media (max-width: 768px) {
  .hero-title { font-size: 38px; }
  .cards-showcase { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
</style>