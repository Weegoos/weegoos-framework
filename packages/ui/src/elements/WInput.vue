<script setup lang="ts">
import { computed, ref } from 'vue';
import { useInputAnimation } from '../composables/useCardAnimation';

defineOptions({
  inheritAttrs: false,
});

interface Props {
  modelValue?: string | number;
  placeholder?: string;
  glowColor?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  width?: string | number;
  type?: 'text' | 'password' | 'number' | 'email' | 'date' | 'tel';
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  glowColor: 'rgba(255, 255, 255, 0.3)',
  type: 'text',
  autocomplete: 'off',
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);
const isPasswordVisible = ref(false);

const currentType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password';
  }
  return props.type;
});

const { wrapperRef, handleMouseMove } = useInputAnimation();

const inputClasses = computed(() => ({
  'w-input--error': props.error,
  'w-input--success': props.success,
  'w-input--disabled': props.disabled,
  'has-toggle': props.type === 'password',
}));
</script>

<template>
  <div
    class="w-input-wrapper"
    ref="wrapperRef"
    @mousemove="handleMouseMove"
    :style="{
      '--glow-color': glowColor,
      width: typeof width === 'number' ? `${width}px` : width,
    }"
  >
    <!-- Добавили v-bind="$attrs", чтобы внешние классы (wg:*) применялись прямо к инпуту -->
    <input
      class="w-input"
      :class="inputClasses"
      v-bind="$attrs"
      :type="currentType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :autocomplete="autocomplete"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <button
      v-if="type === 'password'"
      type="button"
      class="w-input-toggle"
      @click="isPasswordVisible = !isPasswordVisible"
      aria-label="Toggle password visibility"
    >
      <svg
        v-if="isPasswordVisible"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
        ></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.w-input-wrapper {
  position: relative;
  padding: 1px;
  border-radius: 9px;
  background: transparent;
  isolation: isolate;
  display: block;
  width: 100%;
  box-sizing: border-box;
}

/* Эффект свечения */
.w-input-wrapper::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 10px;
  background: radial-gradient(
    250px circle at var(--mouse-x, -100px) var(--mouse-y, -100px),
    var(--glow-color),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.w-input-wrapper:hover::before {
  opacity: 1;
}

.w-input {
  width: 100%;
  padding: 12px 16px;
  background: #0e1017;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-sizing: border-box;
  display: block;
}

.w-input:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: #13141c;
}

.has-toggle {
  padding-right: 45px;
}

.w-input-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.w-input-toggle:hover {
  color: #fff;
}

.w-input--error {
  border-color: rgba(239, 68, 68, 0.5);
}

.w-input--success {
  border-color: rgba(34, 197, 94, 0.5);
}

.w-input--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>