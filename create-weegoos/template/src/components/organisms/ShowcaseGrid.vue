<script setup lang="ts">
import FeatureCard from '../molecules/FeatureCard.vue'
</script>

<template>
  <section id="showcase" class="wg-grid-section">
    <div class="cards-showcase">
      <FeatureCard 
        tagText="Performance"
        tagVariant="purple"
        title="GSAP Интеграция"
        description="Плавные интерактивные анимации с контролем частоты кадров. Никаких микрофризов."
        metaText="computed_signals.log"
        metaColorClass="text-purple"
        bg="#0f0926"
        borderColor="rgba(129, 140, 248, 0.15)"
        hoverBorderColor="#818cf8"
        glowColor="rgba(129, 140, 248, 0.25)"
      />

      <FeatureCard 
        tagText="Design System"
        tagVariant="green"
        title="Токены Weegoos"
        description="Гибкое управление радиусами, паддингами и неоновым свечением напрямую через пропсы."
        metaText="weegoos.config.ts"
        metaColorClass="text-green"
        bg="#0d1511"
        borderColor="rgba(0, 220, 130, 0.15)"
        hoverBorderColor="#00dc82"
        glowColor="rgba(0, 220, 130, 0.2)"
      />
    </div>
  </section>
</template>

<style scoped>
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

@media (max-width: 768px) {
  .cards-showcase { grid-template-columns: 1fr; }
}
</style>