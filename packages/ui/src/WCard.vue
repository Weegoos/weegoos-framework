<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import { useCardAnimation } from './composables/useCardAnimation';

interface Props {
  width?: string | number;
  height?: string | number;
  maxTilt?: number;
  perspective?: number;
  glowColor?: string;
  glowSize?: number;
  
  // Флаги управления эффектами
  tilt?: boolean;
  glow?: boolean;
  scaleOnHover?: boolean;

  // Интенсивность и физика ховера
  hoverScale?: number;
  hoverDuration?: number;
  hoverEase?: string;
  
  // Управление тенями
  shadow?: boolean | string;
  hoverShadow?: string;

  // Тип курсора (pointer, grab, default и т.д.)
  cursor?: string;

  // Токены Weegoos Framework
  borderRadius?: string;
  background?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  padding?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 'auto',
  maxTilt: 12,
  perspective: 1000,
  glowColor: 'rgba(0, 220, 130, 0.12)',
  glowSize: 400,
  
  tilt: true,
  glow: true,
  scaleOnHover: true,

  hoverScale: 1.015,
  hoverDuration: 0.4,
  hoverEase: 'power2.out',
  
  shadow: true,
  hoverShadow: undefined,

  // Курсор по умолчанию
  cursor: 'default',
  
  borderRadius: '12px',
  background: '#13141c',
  borderColor: 'rgba(255, 255, 255, 0.05)',
  hoverBorderColor: 'rgba(255, 255, 255, 0.12)',
  padding: '24px'
});

const cardRef = ref<HTMLElement | null>(null);
const slots = useSlots();

const hasStructuredLayout = computed(() => !!(slots.header || slots.footer));

const {
  glowX,
  glowY,
  isHovered,
  handleMouseMove,
  handleMouseEnter,
  handleMouseLeave
} = useCardAnimation(cardRef, props);

const formatSize = (value: string | number) => {
  return typeof value === 'number' ? `${value}px` : value;
};

const DEFAULT_SHADOW = '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.4)';
const DEFAULT_HOVER_SHADOW = '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.3)';

const computedShadow = computed(() => {
  if (props.shadow === false) return 'none';
  if (props.shadow === true) return DEFAULT_SHADOW;
  return props.shadow;
});

const computedHoverShadow = computed(() => {
  if (props.shadow === false) return 'none';
  if (props.hoverShadow) return props.hoverShadow;
  if (props.shadow === true) return DEFAULT_HOVER_SHADOW;
  return props.shadow; 
});

const cardStyles = computed(() => ({
  width: formatSize(props.width),
  height: formatSize(props.height),
  '--w-card-radius': props.borderRadius,
  '--w-card-bg': props.background,
  '--w-card-border': props.borderColor,
  '--w-card-border-hover': props.hoverBorderColor,
  '--w-card-padding': props.padding,
  '--w-card-shadow': computedShadow.value,
  '--w-card-shadow-hover': computedHoverShadow.value,
  
  // Передаем динамический курсор
  '--w-card-cursor': props.cursor,
}));
</script>

<template>
  <div 
    class="w-card-perspective" 
    :style="{ perspective: tilt ? `${perspective}px` : undefined, ...cardStyles }"
  >
    <div
      ref="cardRef"
      class="w-card"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div
        v-if="glow"
        class="w-card-glow"
        :style="{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${glowSize}px circle at ${glowX}px ${glowY}px, ${glowColor}, transparent)`,
        }"
      ></div>

      <div 
        class="w-card-content"
        :class="{ 'w-card-layout-structured': hasStructuredLayout }"
        :style="{ transform: tilt ? 'translateZ(20px)' : 'none' }"
      >
        <div v-if="$slots.header" class="w-card-header">
          <slot name="header" />
        </div>
        
        <div class="w-card-body">
          <slot />
        </div>

        <div v-if="$slots.footer" class="w-card-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.w-card-perspective {
  display: inline-block;
  box-sizing: border-box;
}

.w-card {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--w-card-bg);
  border: 1px solid var(--w-card-border);
  border-radius: var(--w-card-radius);
  padding: var(--w-card-padding);
  box-shadow: var(--w-card-shadow);
  
  /* Применяем кастомный курсор */
  cursor: var(--w-card-cursor);
  
  box-sizing: border-box;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform, box-shadow;
  transition: border-color 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease;
}

.w-card:hover {
  border-color: var(--w-card-border-hover);
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01)), var(--w-card-bg);
  box-shadow: var(--w-card-shadow-hover);
}

.w-card-glow {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 1;
  will-change: background, opacity;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.w-card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  font-family: Inter, SF Pro Display, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.w-card-layout-structured {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.w-card-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.w-card-body {
  flex-grow: 1;
}

.w-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}
</style>