<template>
  <div class="w-datepicker-wrapper" ref="wrapperRef">
    <WInput 
      :modelValue="displayValue" 
      placeholder="ДД.ММ.ГГГГ" 
      readonly 
      @click="togglePicker"
    />

    <Teleport to="body">
      <div 
        v-if="isOpen" 
        class="w-calendar-premium" 
        :style="popoverStyle" 
        ref="calRef"
      >
        <div class="w-calendar-header">
          <div class="year-label">{{ format(currentMonth, 'yyyy') }}</div>
          <div class="date-label">{{ format(currentMonth, 'EEE, d MMM', { locale: ru }) }}</div>
        </div>

        <div class="w-calendar-nav">
          <button @click="prevMonth" type="button" class="nav-btn">❮</button>
          <span class="month-label">{{ format(currentMonth, 'MMMM', { locale: ru }) }}</span>
          <button @click="nextMonth" type="button" class="nav-btn">❯</button>
        </div>

        <div class="w-calendar-grid">
          <div class="day-name" v-for="d in ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']" :key="d">{{ d }}</div>
          <div 
            v-for="day in daysInMonth" 
            :key="day.toString()" 
            class="day-cell" 
            @click="selectDate(day)"
          >
            {{ format(day, 'd') }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue';
import { format, parseISO, eachDayOfInterval, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import { ru } from 'date-fns/locale';
import { gsap } from 'gsap';

const props = defineProps(['modelValue', 'format']);
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const calRef = ref(null);
const currentMonth = ref(new Date());

const daysInMonth = computed(() => eachDayOfInterval({
  start: startOfMonth(currentMonth.value),
  end: endOfMonth(currentMonth.value)
}));

const displayValue = computed(() => 
  props.modelValue ? format(parseISO(props.modelValue), props.format || 'dd.MM.yyyy') : ''
);

const wrapperRef = ref(null);
const popoverStyle = ref({});
const togglePicker = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    await nextTick();
    const rect = wrapperRef.value.getBoundingClientRect();
    
    // Рассчитываем координаты, чтобы календарь был точно под инпутом
    popoverStyle.value = {
      position: 'absolute',
      top: `${rect.bottom + window.scrollY + 5}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px` // Ширина такая же, как у инпута
    };
  }
};

const prevMonth = () => {
  gsap.to('.w-calendar-grid', { opacity: 0, x: -20, duration: 0.2, onComplete: () => {
    currentMonth.value = subMonths(currentMonth.value, 1);
    gsap.to('.w-calendar-grid', { opacity: 1, x: 0, duration: 0.2 });
  }});
};

const nextMonth = () => {
  gsap.to('.w-calendar-grid', { opacity: 0, x: 20, duration: 0.2, onComplete: async () => {
    currentMonth.value = addMonths(currentMonth.value, 1);
    await nextTick(); // Ждем рендеринга обновленных дат
    gsap.to('.w-calendar-grid', { opacity: 1, x: 0, duration: 0.2 });
  }});
};

const selectDate = (date: Date) => {
  emit('update:modelValue', format(date, 'yyyy-MM-dd'));
  isOpen.value = false;
};

watch(isOpen, async (val) => {
  if (val) {
    await nextTick(); // Ждем, пока v-if отрисует элемент в DOM
    
    if (calRef.value) {
      gsap.fromTo(calRef.value, 
        { opacity: 0, y: 10, scale: 0.98 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }
});
</script>

<style scoped>
.w-datepicker-wrapper { position: relative; width: 100%; }

.w-calendar-premium {
position: absolute;
  top: 100%;
  left: 0;
  z-index: 9999; /* Очень высокий индекс */
  width: 100%;
}

.w-calendar-header { background: #007bff; padding: 16px; color: white; }
.year-label { font-size: 0.8rem; opacity: 0.7; }
.date-label { font-size: 1.4rem; font-weight: bold; }

.w-calendar-nav { display: flex; justify-content: space-between; padding: 10px 15px; color: #fff; align-items: center; }
.nav-btn { background: none; border: none; color: #fff; cursor: pointer; padding: 5px; }

.w-calendar-grid { 
  display: grid; grid-template-columns: repeat(7, 1fr); 
  padding: 10px; gap: 4px; color: #fff; text-align: center;
}

.day-name { font-size: 0.7rem; color: #666; margin-bottom: 5px; }
.day-cell { 
  padding: 8px 0; cursor: pointer; border-radius: 6px; font-size: 0.9rem;
  transition: background 0.2s;
}
.day-cell:hover { background: rgba(255,255,255,0.1); }
</style>