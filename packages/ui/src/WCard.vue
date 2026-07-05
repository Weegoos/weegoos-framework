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
  
  // Флаги управления эффектами
  tilt?: boolean;
  glow?: boolean;
  scaleOnHover?: boolean;
  
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
  
  // По умолчанию все эффекты включены
  tilt: true,
  glow: true,
  scaleOnHover: true,
  
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

  // Рассчитываем координаты свечения, только если оно включено
  if (props.glow) {
    glowX.value = x;
    glowY.value = y;
  }

  // Запускаем tilt-анимацию, только если переключатель активен
  if (props.tilt) {
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
  }
};

const handleMouseEnter = () => {
  isHovered.value = true;
  
  // Анимируем увеличение, только если scaleOnHover активен
  if (cardRef.value && props.scaleOnHover) {
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

  // Возвращаем карту в дефолтное состояние с проверкой, что именно нужно сбрасывать
  const resetTargets: gsap.TweenVars = {
    duration: 0.6,
    ease: 'power2.out',
    overwrite: 'auto'
  };

  if (props.tilt) {
    resetTargets.rotateX = 0;
    resetTargets.rotateY = 0;
  }
  
  if (props.scaleOnHover) {
    resetTargets.scale = 1;
    resetTargets.z = 0;
  }

  // Запускаем сброс анимации только при наличии активных флагов
  if (props.tilt || props.scaleOnHover) {
    gsap.to(cardRef.value, resetTargets);
  }
};
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
      <!-- Слой интерактивного свечения рендерится только при glow="true" -->
      <div
        v-if="glow"
        class="w-card-glow"
        :style="{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${glowSize}px circle at ${glowX}px ${glowY}px, ${glowColor}, transparent)`,
        }"
      ></div>

      <!-- Слот контента -->
      <!-- Динамически убираем translateZ, если tilt отключен, чтобы избежать лишнего размытия текста -->
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
  
  box-sizing: border-box;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
  transition: border-color 0.4s ease, background-color 0.4s ease;
}

.w-card:hover {
  border-color: var(--w-card-border-hover);
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
  height: 100%;
}
</style>