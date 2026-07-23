<!-- WCalendar.vue -->
<template>
  <div class="w-calendar">
    <div class="w-calendar-header">
      <button class="nav-arrow" @click="$emit('nav', -1)">❮</button>
      <div class="nav-info">
        <span
          class="nav-clickable"
          :class="{ active: view === 'month' }"
          @click="$emit('update:view', 'month')"
        >
          {{ format(currentMonth, 'MMMM', { locale: ru }) }}
        </span>
        <span
          class="nav-clickable"
          :class="{ active: view === 'year' }"
          @click="$emit('update:view', 'year')"
        >
          {{ format(currentMonth, 'yyyy') }}
        </span>
      </div>
      <button class="nav-arrow" @click="$emit('nav', 1)">❯</button>
    </div>

    <div v-if="view === 'day'" class="w-calendar-grid">
      <div class="day-name" v-for="d in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']" :key="d">
        {{ d }}
      </div>
      <div
        v-for="day in days"
        :key="day.toString()"
        class="day-cell"
        :class="{
          'is-today': isToday(day),
          'is-selected': selectedDate && isSameDay(selectedDate, day),
        }"
        @click="$emit('select-date', day)"
      >
        {{ format(day, 'd') }}
      </div>
    </div>

    <div v-if="view === 'month'" class="w-calendar-grid-choice">
      <div
        v-for="(m, i) in 12"
        :key="m"
        class="choice-cell"
        :class="{ 'is-selected': i === getMonth(currentMonth) }"
        @click="$emit('select-month', i)"
      >
        {{ format(new Date(2024, i, 1), 'MMM', { locale: ru }) }}
      </div>
    </div>

    <div v-if="view === 'year'" class="w-calendar-grid-choice">
      <div
        v-for="y in years"
        :key="y"
        class="choice-cell"
        :class="{ 'is-selected': y === getYear(currentMonth) }"
        @click="$emit('select-year', y)"
      >
        {{ y }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format, getMonth, getYear, isToday, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';

defineProps<{
  currentMonth: Date;
  view: 'day' | 'month' | 'year';
  days: Date[];
  years: number[];
  selectedDate: Date | null;
}>();

defineEmits(['nav', 'update:view', 'select-date', 'select-month', 'select-year']);
</script>

<style scoped>
.w-calendar {
  padding: 12px;
}
.w-calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.nav-arrow {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 5px;
  opacity: 0.5;
}
.nav-arrow:hover {
  opacity: 1;
}
.nav-info {
  display: flex;
  gap: 8px;
  font-weight: 600;
  color: #fff;
}
.nav-clickable {
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: 0.2s;
}
.nav-clickable:hover,
.nav-clickable.active {
  background: rgba(0, 123, 255, 0.2);
  color: #007bff;
}
.w-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
.w-calendar-grid-choice {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.day-cell,
.choice-cell {
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  color: #fff;
  transition: 0.2s;
}
.day-cell:hover,
.choice-cell:hover {
  background: #007bff;
}
.is-today {
  color: #007bff;
  font-weight: bold;
  border: 1px solid #007bff;
}
.is-selected {
  background: #007bff !important;
  color: white;
}
</style>
