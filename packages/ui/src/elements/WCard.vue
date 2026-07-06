<script setup lang="ts">
import { ref, computed, useSlots, onMounted } from 'vue';
import { useCardAnimation } from '../composables/useCardAnimation';
import { gsap } from 'gsap';
import { RADIUS_MAP, SIZE_MAP, ELEVATION_MAP, COLOR_MAP } from '../tokens/card.tokens';

type CardPreset = 'default' | 'glass' | 'solid' | 'elevated' | 'minimal' | 'neon';

type CardColor = keyof typeof COLOR_MAP;
interface Props {
  // --- 1. Дизайн-токены (System Defaults) ---
  preset?: CardPreset;
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
  size: 'md',
  radius: 'md',
  color: 'neutral',
  elevation: 'md',
  preset: 'default',

  // ===== Анимации =====
  maxTilt: 12,
  perspective: 1000,

  glowSize: 400,
  glowOpacity: 1,
  glowBlur: '0px',

  tilt: true,
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

  transition: 'border-color 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease',

  // Эти можно оставить
  width: '100%',
  height: 'auto',
});

const emit = defineEmits<{
  (e: 'mouseenter', event: MouseEvent): void;
  (e: 'mouseleave', event: MouseEvent): void;
  (e: 'mousemove', event: MouseEvent | TouchEvent): void;
}>();

const cardRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!cardRef.value) return;

  gsap.set(cardRef.value, {
    rotateX: 0,
    rotateY: 0,
  });
});
const slots = useSlots();

const hasStructuredLayout = computed(() => !!(slots.header || slots.footer));

const { glowX, glowY, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave } =
  useCardAnimation(cardRef, props);

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
const PRESET_MAP = {
  default: {
    background: '#13141c',

    border: 'rgba(255,255,255,.05)',
    hoverBorder: 'rgba(255,255,255,.12)',

    shadow: ELEVATION_MAP.md,
    hoverShadow: ELEVATION_MAP.lg,

    glow: false,
    glowColor: undefined,
    glowOpacity: 0,
    glowSize: 350,
    glowBlur: '0px',

    overlay: 'rgba(255,255,255,.01)',

    scale: 1.015,

    backdropFilter: 'none',

    textColor: 'inherit',
  },

  glass: {
    background: 'rgba(255,255,255,.05)',

    border: 'rgba(255,255,255,.12)',
    hoverBorder: 'rgba(255,255,255,.20)',

    shadow: ELEVATION_MAP.sm,
    hoverShadow: ELEVATION_MAP.md,

    glow: false,
    glowColor: undefined,
    glowOpacity: 0,
    glowSize: 350,
    glowBlur: '20px',

    overlay: 'rgba(255,255,255,.02)',

    scale: 1.02,

    backdropFilter: 'blur(20px)',

    textColor: 'inherit',
  },

  solid: {
    background: undefined,

    border: 'transparent',
    hoverBorder: 'transparent',

    shadow: ELEVATION_MAP.none,
    hoverShadow: ELEVATION_MAP.sm,

    glow: false,
    glowColor: undefined,
    glowOpacity: 0,
    glowSize: 350,
    glowBlur: '0px',

    overlay: 'transparent',

    scale: 1.01,

    backdropFilter: 'none',

    textColor: '#fff',
  },

  elevated: {
    background: '#181a22',

    border: 'rgba(255,255,255,.04)',
    hoverBorder: 'rgba(255,255,255,.08)',

    shadow: ELEVATION_MAP.lg,
    hoverShadow: '0 25px 50px rgba(0,0,0,.35)',

    glow: false,
    glowColor: undefined,
    glowOpacity: 0,
    glowSize: 400,
    glowBlur: '10px',

    overlay: 'rgba(255,255,255,.015)',

    scale: 1.02,

    backdropFilter: 'none',

    textColor: 'inherit',
  },

  minimal: {
    background: 'transparent',

    border: 'transparent',
    hoverBorder: 'transparent',

    shadow: 'none',
    hoverShadow: 'none',

    glow: false,
    glowColor: undefined,
    glowOpacity: 0,
    glowSize: 0,
    glowBlur: '0px',

    overlay: 'transparent',

    scale: 1,

    backdropFilter: 'none',

    textColor: 'inherit',
  },

  neon: {
    background: '#0e1017',

    border: undefined,
    hoverBorder: undefined,

    shadow: undefined,
    hoverShadow: undefined,

    glow: true,
    glowColor: undefined,
    glowOpacity: 0.45,
    glowSize: 520,
    glowBlur: '28px',

    overlay: 'rgba(255,255,255,.03)',

    scale: 1.025,

    backdropFilter: 'none',

    textColor: '#fff',
  },
} as const;
const accentColor = computed(() => COLOR_MAP[props.color]);
const preset = computed(() => PRESET_MAP[props.preset]);
const isGlowEnabled = computed(() => {
  return props.glow ?? preset.value.glow;
});

const glowSize = computed(() => props.glowSize ?? preset.value.glowSize);

const glowBlur = computed(() => props.glowBlur ?? preset.value.glowBlur);

const glowColor = computed(() => {
  if (props.glowColor) return props.glowColor;

  if (preset.value.glowColor) return preset.value.glowColor;

  return COLOR_MAP[props.color];
});

const reset = () => {
  if (!cardRef.value) return;

  gsap.to(cardRef.value, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.4,
    ease: 'power2.out',
  });
};

const tiltTo = (x: number, y: number) => {
  if (!cardRef.value) return;

  gsap.to(cardRef.value, {
    rotateX: -y,
    rotateY: x,
    duration: 0.4,
    ease: 'power2.out',
  });
};

const focus = () => {
  cardRef.value?.focus();
};

defineExpose({
  reset,
  tiltTo,
  focus,
  element: cardRef,
});

const cardStyles = computed(() => ({
  width: formatSize(props.width),
  height: formatSize(props.height),

  '--w-card-radius': props.borderRadius ?? RADIUS_MAP[props.radius],

  '--w-card-bg': props.background ?? preset.value.background ?? COLOR_MAP[props.color],
  '--w-card-border-width': formatSize(props.borderWidth ?? '1px'),

  '--w-card-border':
    props.borderColor ?? (props.preset === 'neon' ? accentColor.value : preset.value.border),

  '--w-card-border-hover':
    props.hoverBorderColor ??
    (props.preset === 'neon' ? accentColor.value : preset.value.hoverBorder),

  '--w-card-padding': props.padding ?? SIZE_MAP[props.size],

  '--w-card-shadow':
    props.shadow === false
      ? 'none'
      : props.shadow === true
        ? props.preset === 'neon'
          ? `0 0 30px ${accentColor.value}55`
          : preset.value.shadow
        : props.shadow,

  '--w-card-cursor': props.disabled ? 'default' : props.cursor,

  '--w-card-overflow': props.overflow,

  '--w-card-transition': props.transition,

  '--w-card-glow-opacity': String(props.glowOpacity ?? preset.value.glowOpacity),

  '--w-card-shadow-hover':
    props.hoverShadow ??
    (props.shadow === false
      ? 'none'
      : props.shadow === true
        ? preset.value.hoverShadow
        : props.shadow),

  '--w-card-backdrop-filter': preset.value.backdropFilter,

  '--w-card-text': preset.value.textColor,
}));
</script>

<template>
  <div
    class="w-card-perspective"
    :style="{ perspective: tilt && !disabled ? `${perspective}px` : undefined, ...cardStyles }"
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
      <div v-if="isGlowEnabled && !disabled" class="w-card-glow-container">
        <slot v-if="$slots.glow" name="glow" :x="glowX" :y="glowY" :isHovered="isHovered" />

        <div
          v-else
          class="w-card-glow-default"
          :style="{
            opacity: isHovered ? 'var(--w-card-glow-opacity)' : 0,
            filter: `blur(${formatSize(glowBlur)})`,
            background: `radial-gradient(${glowSize.value}px circle at ${glowX}px ${glowY}px, ${glowColor}, transparent)`,
          }"
        ></div>
      </div>

      <div
        class="w-card-content"
        :class="{ 'w-card-layout-structured': hasStructuredLayout }"
        :style="{ transform: tilt && !disabled ? 'translateZ(20px)' : 'none' }"
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
  backdrop-filter: var(--w-card-backdrop-filter);
  -webkit-backdrop-filter: var(--w-card-backdrop-filter);

  color: var(--w-card-text);

  transition: var(--w-card-transition);
}

/* На мобильных предотвращаем нежелательные зависания скролла, если тач выключен */
.w-card-touch-active {
  touch-action: none;
}

.w-card:not(.w-card-disabled):hover {
  border-color: var(--w-card-border-hover);
  background:
    linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01)), var(--w-card-bg);
  box-shadow: var(--w-card-shadow-hover);
}

.w-card-glow-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  border-radius: calc(var(--w-card-radius) - var(--w-card-border-width));
  overflow: hidden;
}

.w-card-glow-default {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  will-change: background, opacity;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.w-card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  font-family:
    Inter,
    SF Pro Display,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
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
