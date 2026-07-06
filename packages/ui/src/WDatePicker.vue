<template>
  <div class="w-datepicker-wrapper" ref="wrapperRef">
    <WInput 
      :modelValue="displayValue" 
      placeholder="ДД.ММ.ГГГГ" 
      readonly 
      @click="togglePicker"
    />

    <Teleport to="body">
      <div v-if="isOpen" class="w-calendar-premium" :style="popoverStyle" ref="calRef">
        <!-- Header с индикацией шага -->
        <div class="w-calendar-header">
          <button class="nav-arrow" @click="prev">❮</button>
          <div class="nav-info">
            <span class="nav-clickable" :class="{ 'active': view === 'month' }" @click="view = 'month'">
              {{ format(currentMonth, 'MMMM', { locale: ru }) }}
            </span>
            <span class="nav-clickable" :class="{ 'active': view === 'year' }" @click="view = 'year'">
              {{ format(currentMonth, 'yyyy') }}
            </span>
          </div>
          <button class="nav-arrow" @click="next">❯</button>
        </div>

        <!-- Сетка выбора -->
        <div v-if="view === 'day'" class="w-calendar-grid">
          <div class="day-name" v-for="d in ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']" :key="d">{{ d }}</div>
          <div v-for="day in daysInMonth" :key="day.toString()" class="day-cell" @click="selectDate(day)">
            {{ format(day, 'd') }}
          </div>
        </div>

        <div v-if="view === 'month'" class="w-calendar-grid-choice">
          <div v-for="(m, i) in 12" :key="m" class="choice-cell" @click="selectMonth(i)">
            {{ format(new Date(2024, i, 1), 'MMM', { locale: ru }) }}
          </div>
        </div>

        <div v-if="view === 'year'" class="w-calendar-grid-choice">
          <div v-for="y in yearRange" :key="y" class="choice-cell" @click="selectYear(y)">
            {{ y }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { format, parseISO, eachDayOfInterval, startOfMonth, endOfMonth, setMonth, setYear, getYear, addMonths, subMonths, addYears, subYears } from 'date-fns';
import { ru } from 'date-fns/locale';

const props = defineProps(['modelValue', 'format']);
const emit = defineEmits(['update:modelValue']);

type CalendarView = "day" | "month" | "year";
const view = ref<CalendarView>("day");
const isOpen = ref(false);
const currentMonth = ref(new Date());
const wrapperRef = ref(null);
const calRef = ref(null);
const popoverStyle = ref({});

const daysInMonth = computed(() => eachDayOfInterval({
  start: startOfMonth(currentMonth.value),
  end: endOfMonth(currentMonth.value)
}));

const yearRange = computed(() => {
  const year = getYear(currentMonth.value);
  return Array.from({ length: 12 }, (_, i) => year - 5 + i);
});

const displayValue = computed(() => props.modelValue ? format(parseISO(props.modelValue), props.format || 'dd.MM.yyyy') : '');

const togglePicker = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    await nextTick();
    const rect = wrapperRef.value.getBoundingClientRect();
    popoverStyle.value = {
      position: 'absolute',
      top: `${rect.bottom + window.scrollY + 5}px`,
      left: `${rect.left + window.scrollX}px`,
      width: '300px'
    };
  }
};

const prev = () => {
  if (view.value === 'day') currentMonth.value = subMonths(currentMonth.value, 1);
  else if (view.value === 'month') currentMonth.value = subYears(currentMonth.value, 1);
  else currentMonth.value = subYears(currentMonth.value, 12);
};
const next = () => {
  if (view.value === 'day') currentMonth.value = addMonths(currentMonth.value, 1);
  else if (view.value === 'month') currentMonth.value = addYears(currentMonth.value, 1);
  else currentMonth.value = addYears(currentMonth.value, 12);
};

const selectYear = (y: number) => { 
  currentMonth.value = setYear(currentMonth.value, y); 
  view.value = "month"; // Переход к выбору месяца
};

const selectMonth = (m: number) => { 
  currentMonth.value = setMonth(currentMonth.value, m); 
  view.value = "day"; // Переход к выбору дня
};

const selectDate = (date: Date) => { 
  emit('update:modelValue', format(date, 'yyyy-MM-dd')); 
  isOpen.value = false; // Закрытие только после полного выбора дня
};

const handleClickOutside = (e: MouseEvent) => {
  if (isOpen.value && wrapperRef.value && !wrapperRef.value.contains(e.target as Node) && !calRef.value?.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>

<style scoped>
.w-datepicker-wrapper { position: relative; width: 100%; }
.w-calendar-premium {
  position: absolute; z-index: 9999; background: rgba(18, 18, 22, 0.95);
  backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px; padding: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.6);
}
.w-calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.nav-arrow { background: none; border: none; color: #fff; cursor: pointer; padding: 5px; opacity: 0.5; }
.nav-arrow:hover { opacity: 1; }
.nav-info { display: flex; gap: 8px; font-weight: 600; color: #fff; }
.nav-clickable { cursor: pointer; padding: 4px 8px; border-radius: 6px; transition: 0.2s; }
.nav-clickable:hover, .nav-clickable.active { background: rgba(0, 123, 255, 0.2); color: #007bff; }
.w-calendar-grid, .w-calendar-grid-choice { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.w-calendar-grid-choice { grid-template-columns: repeat(3, 1fr); gap: 8px; }
.day-cell, .choice-cell { 
  padding: 10px 0; text-align: center; cursor: pointer; 
  border-radius: 8px; color: #fff; transition: 0.2s; 
}
.day-cell:hover, .choice-cell:hover { background: #007bff; }
</style>