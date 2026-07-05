<script setup lang="ts">
import { ref, computed } from 'vue';
import { gsap } from 'gsap';

interface Props {
  width?: string | number;
  height?: string | number;
  maxTilt?: number;
  perspective?: number;
  glowColor?: string;
  glowSize?: number;
  
  // Новые пропсы для быстрого управления стилями компонента
  borderRadius?: string;   // например, '16px' или '24px'
  background?: string;     // цвет фона карточки
  borderColor?: string;    // цвет дефолтной рамки
  hoverBorderColor?: string; // цвет рамки при ховере
  padding?: string;        // внутренние отступы
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 'auto',
  maxTilt: 12,
  perspective: 1000,
  glowColor: 'rgba(0, 220, 130, 0.12)',
  glowSize: 400,
  
  // Дефолтные значения токенов Weegoos Framework
  borderRadius: '12px',
  background: '#13141c',
  borderColor: 'rgba(255, 255, 255, 0.05)',
  hoverBorderColor: 'rgba(255, 255, 255, 0.12)',
  padding: '24px'
});

const cardRef = ref<HTMLElement | null>(null);

const glowX = ref(0);
const glowY = ref(0);
const isHovered = ref(false);

const formatSize = (value: string | number) => {
  return typeof value === 'number' ? `${value}px` : value;
};

// Вычисляем локальные CSS-переменные для инжекта в стили
const cardStyles = computed(() => ({
  width: formatSize(props.width),
  height: formatSize(props.height),
  '--w-card-radius': props.borderRadius,
  '--w-card-bg': props.background,
  '--w-card-border': props.borderColor,
  '--w-card-border-hover': props.hoverBorderColor,
  '--w-card-padding': props.padding,
}));

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return;

  const rect = cardRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  glowX.value = x;
  glowY.value = y;

  const normX = (x / rect.width) - 0.5;
  const normY = (y / rect.height) - 0.5;

  const tiltX = -(normY * props.maxTilt);
  const tiltY = normX * props.maxTilt;

  gsap.to(cardRef.value, {
    rotateX: tiltX,
    rotateY: tiltY,
    duration: 0.3,
    ease: 'power2.out',
    overwrite: 'auto'
  });
};

const handleMouseEnter = () => {
  isHovered.value = true;
  if (cardRef.value) {
    gsap.to(cardRef.value, {
      scale: 1.015,
      z: 10,
      duration: 0.4,
      ease: 'power2.out'
    });
  }
};

const handleMouseLeave = () => {
  isHovered.value = false;
  if (!cardRef.value) return;

  gsap.to(cardRef.value, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    z: 0,
    duration: 0.6,
    ease: 'power2.out',
    overwrite: 'auto'
  });
};
</script>

<template>
  <div 
    class="w-card-perspective" 
    :style="{ perspective: `${perspective}px`, ...cardStyles }"
  >
    <div
      ref="cardRef"
      class="w-card"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Слой интерактивного свечения -->
      <div
        class="w-card-glow"
        :style="{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${glowSize}px circle at ${glowX}px ${glowY}px, ${glowColor}, transparent)`,
        }"
      ></div>

      <!-- Слот контента -->
      <div class="w-card-content">
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
  
  /* Использование локальных переменных компонента */
  background: var(--w-card-bg);
  border: 1px solid var(--w-card-border);
  border-radius: var(--w-card-radius);
  padding: var(--w-card-padding);
  
  box-sizing: border-box;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
  transition: border-color 0.4s ease, background-color 0.4s ease;
}

.w-card:hover {
  border-color: var(--w-card-border-hover);
  /* При ховере слегка подсвечиваем подложку, завязываясь на цвет фона */
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01)), var(--w-card-bg);
}

.w-card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  will-change: background, opacity;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.w-card-content {
  position: relative;
  z-index: 2;
  transform: translateZ(20px); 
  height: 100%;
}
</style>