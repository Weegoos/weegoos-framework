<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import { useCardAnimation } from './composables/useCardAnimation';
import {
  RADIUS_MAP,
  SIZE_MAP,
 ELEVATION_MAP,
  COLOR_MAP,
} from './tokens/card.tokens';

type CardColor = keyof typeof COLOR_MAP;
interface Props {
  // --- 1. Дизайн-токены (System Defaults) ---
  variant?: 'default' | 'glass' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  color?: CardColor;
  elevation?: 'none' | 'sm' | 'md' | 'lg';

  // --- 2. Глубокая кастомизация (Твои старые пропсы) ---
  // Если переданы, они перекрывают токены
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  background?: string;
  borderWidth?: string | number;
  borderColor?: string;
  hoverBorderColor?: string;
  padding?: string;
  
  // --- 3. Интерактив и анимации ---
  tilt?: boolean;
  tiltOnTouch?: boolean;
  maxTilt?: number;
  perspective?: number;
  
  glow?: boolean;
  glowColor?: string;
  glowSize?: number;
  glowOpacity?: number;
  glowBlur?: string | number;

  scaleOnHover?: boolean;
  hoverScale?: number;
  hoverDuration?: number;
  hoverEase?: string;
  
  shadow?: boolean | string;
  hoverShadow?: string;

  // --- 4. Технические ---
  cursor?: string;
  overflow?: string;
  as?: string;
  disabled?: boolean;
  transition?: string;
}

const props = withDefaults(defineProps<Props>(), {
  // ===== Дизайн-токены =====
  variant: 'default',
  size: 'md',
  radius: 'md',
  color: 'neutral',
  elevation: 'md',

  // ===== Анимации =====
  maxTilt: 12,
  perspective: 1000,

  glowColor: 'rgba(0, 220, 130, 0.12)',
  glowSize: 400,
  glowOpacity: 1,
  glowBlur: '0px',

  tilt: true,
  glow: true,
  scaleOnHover: true,
  disabled: false,
  tiltOnTouch: false,

  hoverScale: 1.015,
  hoverDuration: 0.4,
  hoverEase: 'power2.out',

  shadow: true,
  hoverShadow: undefined,

  cursor: 'default',
  overflow: 'hidden',

  as: 'div',

  transition:
    'border-color 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease',

  // Эти можно оставить
  width: '100%',
  height: 'auto',
});

const emit = defineEmits<{
  (e: 'mouseenter', event: MouseEvent): void
  (e: 'mouseleave', event: MouseEvent): void
  (e: 'mousemove', event: MouseEvent | TouchEvent): void
}>();

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


// Адаптированные хендлеры событий
const onMouseMove = (e: MouseEvent) => {
  handleMouseMove(e);
  emit('mousemove', e);
};

const onTouchMove = (e: TouchEvent) => {
  if (props.tiltOnTouch) {
    handleMouseMove(e);
    emit('mousemove', e);
  }
};

const onMouseEnter = (e: MouseEvent) => {
  handleMouseEnter(e);
  emit('mouseenter', e);
};

const onTouchStart = (e: TouchEvent) => {
  if (props.tiltOnTouch) {
    // Симулируем вход для тача
    handleMouseEnter(e as any); 
    handleMouseMove(e);
  }
};

const onMouseLeave = (e: MouseEvent) => {
  handleMouseLeave(e);
  emit('mouseleave', e);
};

const onTouchEnd = (e: TouchEvent) => {
  if (props.tiltOnTouch) {
    handleMouseLeave(e);
  }
};

const formatSize = (value: string | number) => {
  return typeof value === 'number' ? `${value}px` : value;
};

const cardStyles = computed(() => ({
  width: formatSize(props.width),
  height: formatSize(props.height),

  '--w-card-radius':
    props.borderRadius ??
    RADIUS_MAP[props.radius],

'--w-card-bg':
  props.background ??
  (
    props.variant === 'glass'
      ? 'rgba(255,255,255,0.05)'
      : props.variant === 'solid'
        ? COLOR_MAP[props.color]
        : '#13141c'
  ),
  '--w-card-border-width':
    formatSize(props.borderWidth ?? '1px'),

  '--w-card-border':
    props.borderColor ??
    (props.variant === 'glass'
      ? 'rgba(255,255,255,0.1)'
      : 'rgba(255,255,255,0.05)'),

  '--w-card-border-hover':
    props.disabled
      ? (props.borderColor ??
          (props.variant === 'glass'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(255,255,255,0.05)'))
      : (props.hoverBorderColor ??
          'rgba(255,255,255,0.15)'),

  '--w-card-padding':
    props.padding ??
    SIZE_MAP[props.size],

  '--w-card-shadow':
    props.shadow === false
      ? 'none'
      : props.shadow === true
        ? ELEVATION_MAP[props.elevation]
        : props.shadow,

  '--w-card-cursor':
    props.disabled ? 'default' : props.cursor,

  '--w-card-overflow':
    props.overflow,

  '--w-card-transition':
    props.transition,

  '--w-card-glow-opacity':
    String(props.glowOpacity),
  
'--w-card-shadow-hover':
  props.hoverShadow ??
  (props.shadow === false
    ? 'none'
    : props.shadow === true
      ? ELEVATION_MAP[props.elevation]
      : props.shadow),
}));
</script>

<template>
  <div 
    class="w-card-perspective" 
    :style="{ perspective: (tilt && !disabled) ? `${perspective}px` : undefined, ...cardStyles }"
  >
    <component
      :is="as"
      ref="cardRef"
      class="w-card"
      :class="{ 'w-card-disabled': disabled, 'w-card-touch-active': tiltOnTouch }"
      @mousemove="onMouseMove"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @touchmove="onTouchMove"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div v-if="glow && !disabled" class="w-card-glow-container">
        <slot 
          v-if="$slots.glow" 
          name="glow" 
          :x="glowX" 
          :y="glowY" 
          :isHovered="isHovered" 
        />
        
        <div
          v-else
          class="w-card-glow-default"
          :style="{
            opacity: isHovered ? 'var(--w-card-glow-opacity)' : 0,
            filter: `blur(${formatSize(props.glowBlur)})`,
            background: `radial-gradient(${glowSize}px circle at ${glowX}px ${glowY}px, ${glowColor}, transparent)`,
          }"
        ></div>
      </div>

      <div 
        class="w-card-content"
        :class="{ 'w-card-layout-structured': hasStructuredLayout }"
        :style="{ transform: (tilt && !disabled) ? 'translateZ(20px)' : 'none' }"
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
    </component>
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
  border: var(--w-card-border-width, 1px) solid var(--w-card-border);
  border-radius: var(--w-card-radius);
  padding: var(--w-card-padding);
  box-shadow: var(--w-card-shadow);
  cursor: var(--w-card-cursor);
  overflow: var(--w-card-overflow);
  box-sizing: border-box;
  
  text-align: left;
  color: inherit;
  font-size: inherit;
  
  isolation: isolate;
  transform-style: preserve-3d;
  will-change: transform, box-shadow;
  transition: var(--w-card-transition);
}

/* На мобильных предотвращаем нежелательные зависания скролла, если тач выключен */
.w-card-touch-active {
  touch-action: none;
}

.w-card:not(.w-card-disabled):hover {
  border-color: var(--w-card-border-hover);
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01)), var(--w-card-bg);
  box-shadow: var(--w-card-shadow-hover);
}

.w-card-glow-container {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 1;
  border-radius: calc(var(--w-card-radius) - var(--w-card-border-width));
  overflow: hidden;
}

.w-card-glow-default {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
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

@media (prefers-reduced-motion: reduce) {
  .w-card {
    transition: none !important;
    transform: none !important;
  }
  .w-card-perspective {
    perspective: none !important;
  }
  .w-card-content {
    transform: none !important; /* Убираем translateZ(20px) */
  }
  .w-card-glow-default {
    transition: none !important; /* Свечение переключается мгновенно, без затухания */
  }
}
</style>