<script setup lang="ts">
import { ref, computed } from 'vue';
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
  
  // Управление тенями (может быть boolean для пресета или строкой для кастомной тени)
  shadow?: boolean | string;
  hoverShadow?: string;

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
  
  // По умолчанию тень включена (пресет Weegoos)
  shadow: true,
  hoverShadow: undefined,
  
  borderRadius: '12px',
  background: '#13141c',
  borderColor: 'rgba(255, 255, 255, 0.05)',
  hoverBorderColor: 'rgba(255, 255, 255, 0.12)',
  padding: '24px'
});

const cardRef = ref<HTMLElement | null>(null);

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

// Встроенные премиальные пресеты теней Weegoos
const DEFAULT_SHADOW = '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.4)';
const DEFAULT_HOVER_SHADOW = '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.3)';

// Вычисляем значение тени на основе переданного типа (boolean или string)
const computedShadow = computed(() => {
  if (props.shadow === false) return 'none';
  if (props.shadow === true) return DEFAULT_SHADOW;
  return props.shadow; // если передана строка
});

const computedHoverShadow = computed(() => {
  if (props.shadow === false) return 'none';
  if (props.hoverShadow) return props.hoverShadow;
  if (props.shadow === true) return DEFAULT_HOVER_SHADOW;
  // Если shadow — кастомная строка, а hoverShadow не передан, плавно увеличиваем переданную тень
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
  
  // Инжектим тени в CSS переменные
  '--w-card-shadow': computedShadow.value,
  '--w-card-shadow-hover': computedHoverShadow.value,
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
        :style="{ transform: tilt ? 'translateZ(20px)' : 'none' }"
      >
        <slot />
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
  
  /* Применяем реактивную тень */
  box-shadow: var(--w-card-shadow);
  
  box-sizing: border-box;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform, box-shadow;
  /* Добавляем box-shadow в transition, чтобы смена теней при ховере была мягкой */
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
}
</style>