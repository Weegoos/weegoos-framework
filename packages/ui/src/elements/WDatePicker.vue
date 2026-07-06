<!-- WDatePicker.vue -->
<template>
  <div class="w-datepicker-wrapper" ref="wrapperRef">
    <WInput :modelValue="displayValue" :placeholder="placeholder" readonly @click="togglePicker" />
    <Teleport to="body">
      <div v-if="isOpen" class="w-calendar-premium" :style="popoverStyle" ref="calRef">
        <WCalendar
          v-model:view="view"
          :currentMonth="currentMonth"
          :days="daysInMonth"
          :years="yearRange"
          :selectedDate="selectedDate"
          @nav="navigate"
          @select-date="selectDate"
          @select-month="selectMonth"
          @select-year="selectYear"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { format, parseISO } from 'date-fns';
import { useCalendar } from '../composables/useCalendar';

const props = defineProps(['modelValue', 'format', 'placeholder']);
const emit = defineEmits(['update:modelValue']);

const { currentMonth, view, daysInMonth, yearRange, navigate, selectYear, selectMonth } =
  useCalendar();

const isOpen = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);
const calRef = ref<HTMLElement | null>(null);
const popoverStyle = ref({});

const selectedDate = computed(() => (props.modelValue ? parseISO(props.modelValue) : null));
const displayValue = computed(() =>
  props.modelValue ? format(parseISO(props.modelValue), props.format || 'dd.MM.yyyy') : ''
);

const updatePosition = () => {
  if (!isOpen.value || !wrapperRef.value) return;
  const rect = wrapperRef.value.getBoundingClientRect();
  popoverStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 5}px`,
    left: `${rect.left}px`,
    width: '300px',
  };
};

const togglePicker = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    if (props.modelValue) currentMonth.value = parseISO(props.modelValue);
    await nextTick();
    updatePosition();
  }
};

const selectDate = (date: Date) => {
  emit('update:modelValue', format(date, 'yyyy-MM-dd'));
  isOpen.value = false;
};

const handleClickOutside = (e: MouseEvent) => {
  if (
    isOpen.value &&
    wrapperRef.value &&
    !wrapperRef.value.contains(e.target as Node) &&
    !calRef.value?.contains(e.target as Node)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', updatePosition, true);
});
onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', updatePosition, true);
});
</script>

<style scoped>
.w-datepicker-wrapper {
  position: relative;
  width: 100%;
}
.w-calendar-premium {
  z-index: 9999;
  background: rgba(18, 18, 22, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
}
</style>
