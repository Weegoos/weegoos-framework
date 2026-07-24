<script setup lang="ts">
import StatusTag from '../atoms/StatusTag.vue'

defineProps<{
  tagText: string
  tagVariant?: 'green' | 'purple'
  title: string
  description: string
  metaText: string
  metaColorClass: string
  bg: string
  borderColor: string
  hoverBorderColor: string
  glowColor: string
}>()
</script>

<template>
  <WCard 
    width="100%" 
    height="240px"
    :background="bg"
    :borderColor="borderColor"
    :hoverBorderColor="hoverBorderColor"
    borderRadius="16px"
    :glowColor="glowColor"
    padding="28px"
  >
    <div class="showcase-card-inner">
      <StatusTag :variant="tagVariant">{{ tagText }}</StatusTag>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div :class="['card-footer-meta', metaColorClass]">{{ metaText }}</div>
    </div>
  </WCard>
</template>

<style scoped>
.showcase-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.showcase-card-inner h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 14px 0 6px 0;
  letter-spacing: -0.02em;
  color: #fff;
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

.text-purple { color: #818cf8; }
.text-green { color: #00dc82; }
</style>