<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted, computed } from 'vue';
import { gsap } from 'gsap';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  bgColor?: string;
  textColor?: string;
  magnetic?: boolean;
  radius?: number;
  force?: number;
  disabled?: boolean;

  width?: string | number;
  height?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  magnetic: false,
  radius: 80,
  force: 0.35,
  disabled: false
});

const sizeStyle = computed(() => {
  const width =
    props.width != null
      ? typeof props.width === 'number'
        ? `${props.width}px`
        : props.width
      : undefined;

  const height =
    props.height != null
      ? typeof props.height === 'number'
        ? `${props.height}px`
        : props.height
      : undefined;

  const isCircle =
    width &&
    height &&
    width === height;

  return {
    width,
    height,
    borderRadius: isCircle ? '9999px' : undefined
  };
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const config = inject<any>('weegoos-config', null);
const itemRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);

const magneticRadius = computed(() => Number(props.radius)); // Защита от передачи строки "100"
const magneticForce = computed(() => Number(props.force));   // Защита от передачи строки "0.4"
const interpolationFactor = 0.08;

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let isMagnetic = false;

const glowColor = computed(() => {
  if (props.bgColor) return props.bgColor;
  if (props.variant === 'secondary') return 'rgba(255, 255, 255, 0.1)';
  if (props.variant === 'outline' || props.variant === 'ghost') return 'rgba(0, 220, 130, 0.1)';
  return '#00dc82';
});

const handleMouseMove = (e: MouseEvent) => {
  if (!props.magnetic || !itemRef.value || !buttonRef.value || props.disabled) return;

  const rect = itemRef.value.getBoundingClientRect();
  const buttonCenterX = rect.left + rect.width / 2;
  const buttonCenterY = rect.top + rect.height / 2;

  const distX = e.clientX - buttonCenterX;
  const distY = e.clientY - buttonCenterY;
  const distance = Math.hypot(distX, distY);

  if (distance < magneticRadius.value) {
    if (!isMagnetic) {
      isMagnetic = true;
      gsap.to(buttonRef.value, {
        scale: 1.04,
        boxShadow: `0 10px 30px ${glowColor.value}33`,
        duration: config?.defaultDuration || 0.4,
        ease: 'power2.out'
      });
    }
    targetX = distX * magneticForce.value;
    targetY = distY * magneticForce.value;
  } else if (isMagnetic) {
    isMagnetic = false;
    resetButton();
  }
};

const updateAnimation = () => {
  if (!props.magnetic || !buttonRef.value || props.disabled) return;

  if (isMagnetic) {
    currentX += (targetX - currentX) * interpolationFactor;
    currentY += (targetY - currentY) * interpolationFactor;
    gsap.set(buttonRef.value, { x: currentX, y: currentY });
  }
};

const resetButton = () => {
  if (!props.magnetic) return;
  
  isMagnetic = false;
  targetX = 0;
  targetY = 0;

  if (!buttonRef.value) return;

  gsap.to(buttonRef.value, {
    x: 0,
    y: 0,
    scale: 1,
    boxShadow: '0 0 0px rgba(0, 0, 0, 0)',
    duration: 0.5,
    ease: 'elastic.out(1, 0.4)',
    onUpdate: () => {
      if (buttonRef.value) {
        currentX = gsap.getProperty(buttonRef.value, 'x') as number;
        currentY = gsap.getProperty(buttonRef.value, 'y') as number;
      }
    }
  });
};

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return;
  emit('click', event);
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  gsap.ticker.add(updateAnimation);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  gsap.ticker.remove(updateAnimation);
});
</script>

<template>
  <div ref="itemRef" class="w-magnetic-item">
    <button 
      ref="buttonRef" 
      :class="['w-button', `w-button--${variant}`, { 'w-button--disabled': disabled }]"
      :style="{
      backgroundColor: bgColor,
      color: textColor,
      ...sizeStyle
     }"
      @click="handleClick"
      @mouseleave="resetButton"
    >
      <span class="w-button-content">
        <slot />
      </span>
    </button>
  </div>
</template>

<style scoped>
.w-magnetic-item {
  display: inline-block;
  position: relative;
  padding: 6px; /* Фиксированный отступ! Больше раскладка никуда не улетит */
}

.w-button {
  font-family: 'Inter', 'Geist', sans-serif;
  font-size: 14px;
  font-weight: 550;
  letter-spacing: -0.01em;
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  will-change: transform;
  white-space: nowrap;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
   box-sizing: border-box;
}

.w-button:not(.w-button--disabled):hover {
  transform: translateY(-1px);
}

.w-button--primary { background: #00dc82; color: #000000; }
.w-button--primary:hover { background: #00c373; }

.w-button--secondary { background: #ffffff; color: #000000; border-color: rgba(255, 255, 255, 0.1); }
.w-button--secondary:hover { background: #f3f4f6; }

.w-button--outline { background: transparent; color: #ffffff; border-color: rgba(255, 255, 255, 0.15); }
.w-button--outline:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.3); }

.w-button--ghost { background: transparent; color: #ffffff; }
.w-button--ghost:hover { background: rgba(255, 255, 255, 0.05); }

.w-button--disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
.w-button-content { display: inline-flex; align-items: center; gap: 8px; pointer-events: none; }
</style>