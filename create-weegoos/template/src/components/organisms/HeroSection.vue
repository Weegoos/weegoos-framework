<template>
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
      <WButton magnetic :radius="100">
        Начать разработку
      </WButton>
      <a href="#" class="btn-secondary">
        Документация
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
    </div>
  </main>
</template>

<style scoped>
.wg-hero {
  position: relative;
  z-index: 5;
  max-width: 800px;
  text-align: center;
  margin-top: 70px;
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
  color: #fff;
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

@media (max-width: 768px) {
  .hero-title { font-size: 38px; }
}
</style>