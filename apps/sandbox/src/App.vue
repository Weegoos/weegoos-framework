<template>
  <div class="test-container">
    <!-- 1. Базовые пресеты (System Tokens) -->
    <section>
      <h2>Presets Test</h2>
      <div class="grid">
        <WCard preset="default">Default Card</WCard>
        <WCard preset="solid" color="danger">Solid Danger</WCard>
        <WCard preset="minimal">Minimalist Card</WCard>
      </div>
    </section>

    <!-- 2. Neon & Glow (Интерактив) -->
    <section>
      <h2>Neon & Glow</h2>
      <div class="grid">
        <WCard 
          preset="neon" 
          color="accent" 
          :glow="true" 
          glow-color="rgba(0, 255, 255, 0.4)"
        >
          <h3>Cyberpunk Mode</h3>
          <p>Neon glow + tilt animation</p>
        </WCard>
      </div>
    </section>

    <!-- 3. Структурированный контент (Header/Footer) -->
    <section>
      <h2>Structured Layout</h2>
      <WCard width="400px" elevation="lg">
        <template #header>
          <div style="font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
            Card Header
          </div>
        </template>
        
        <p>This is the main body content that stretches due to flex-grow.</p>
        
        <template #footer>
          <button @click="console.log('Action!')">Action</button>
        </template>
      </WCard>
    </section>

    <!-- 4. Ручная кастомизация (Overriding Tokens) -->
    <section>
      <h2>Custom Styles</h2>
      <WCard 
        background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        border-radius="30px"
        border-width="3px"
        border-color="white"
        padding="40px"
        :tilt="false"
      >
        <h3 style="color: white;">Hardcoded Styles</h3>
        <p style="color: white;">Custom gradient and huge border-radius</p>
      </WCard>
    </section>

    <!-- 5. State Test (Disabled) -->
    <section>
      <h2>Disabled State</h2>
      <WCard disabled>
        This card is inactive and won't respond to hover or tilt.
      </WCard>
    </section>

    <section>
  <h2>Dynamic State Toggle</h2>
  <button @click="currentPreset = currentPreset === 'glass' ? 'neon' : 'glass'">
    Toggle Preset
  </button>
  <WCard :preset="currentPreset" :style="{ marginTop: '20px' }">
    <h3>Current: {{ currentPreset }}</h3>
  </WCard>
</section>

<section>
  <h2>Overflow & Sizing</h2>
  <div style="display: flex; gap: 20px;">
    <!-- Жесткий размер + Overflow -->
    <WCard width="150px" height="150px" overflow="auto">
      <p style="width: 300px;">
        Этот контент намного больше карточки. 
        Тут мы проверяем, правильно ли работает overflow: auto и не ломается ли верстка.
      </p>
    </WCard>
    
    <!-- Очень длинная карта -->
    <WCard height="300px" style="display: flex; align-items: center; justify-content: center;">
      Vertical Flex Centering
    </WCard>
  </div>
</section>

<section>
  <h2>Touch Interaction</h2>
  <WCard 
    preset="default" 
    :tilt="true" 
    :tilt-on-touch="true" 
    :max-tilt="25"
  >
    <h3>Touch Me!</h3>
    <p>На мобильном устройстве эта карта будет наклоняться при движении пальца.</p>
  </WCard>
</section>

<section>
  <h2>Zero-Prop Test</h2>
  <WCard>
    Я работаю без единого пропса?
  </WCard>
</section>

<section>
  <h2>Expose API Control</h2>
  <WCard ref="apiCard" preset="elevated">
    <h3>API Controlled</h3>
    <div style="display:flex; gap: 10px; margin-top: 10px;">
      <button @click="$refs.apiCard.tiltTo(30, 30)">Force Tilt</button>
      <button @click="$refs.apiCard.reset()">Reset Tilt</button>
    </div>
  </WCard>
</section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentPreset = ref('glass');
</script>

<style scoped>
.test-container {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  background: #050505;
  color: white;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
section h2 { margin-bottom: 20px; color: #888; }
</style>