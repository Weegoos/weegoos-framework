<!-- WBadge.vue -->
<template>
  <div
    class="w-badge"
    :class="[{ 'is-interactive': interactive }]"
    :style="componentStyles"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RADIUS_MAP, COLOR_MAP } from '../tokens/card.tokens';

const props = withDefaults(
  defineProps<{
    variant?: keyof typeof COLOR_MAP;
    interactive?: boolean;
  }>(),
  {
    variant: 'primary',
    interactive: true,
  }
);

const mousePos = ref({ x: 0, y: 0 });
const isHovering = ref(false);

const handleMouseMove = (e: MouseEvent) => {
  if (!props.interactive) return;
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  mousePos.value = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
};

const componentStyles = computed(() => ({
  '--x': `${mousePos.value.x}px`,
  '--y': `${mousePos.value.y}px`,
  '--bg-color': COLOR_MAP[props.variant],
  '--radius': RADIUS_MAP.xl,
}));
</script>

<style scoped>
.w-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: var(--radius);
  font-size: 12px;
  font-weight: 500;
  cursor: default;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--bg-color);
  color: #fff;
}

.is-interactive {
  cursor: pointer;
}
.is-interactive:hover {
  transform: scale(1.05);
}
.is-interactive:active {
  transform: scale(0.95);
}

.w-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    80px circle at var(--x) var(--y),
    rgba(255, 255, 255, 0.15),
    transparent 80%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.w-badge:hover::before {
  opacity: 1;
}
</style>
