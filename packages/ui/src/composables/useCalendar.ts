// useCalendar.ts
import { ref, computed } from 'vue';
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  setMonth,
  setYear,
  getYear,
  addMonths,
  subMonths,
  addYears,
  subYears,
} from 'date-fns';

export const useCalendar = (initialDate: Date = new Date()) => {
  const currentMonth = ref(initialDate);
  const view = ref<'day' | 'month' | 'year'>('day');

  const daysInMonth = computed(() =>
    eachDayOfInterval({
      start: startOfMonth(currentMonth.value),
      end: endOfMonth(currentMonth.value),
    })
  );

  const yearRange = computed(() => {
    const year = getYear(currentMonth.value);
    return Array.from({ length: 12 }, (_, i) => year - 5 + i);
  });

  const navigate = (dir: number) => {
    if (view.value === 'day') {
      currentMonth.value =
        dir > 0 ? addMonths(currentMonth.value, 1) : subMonths(currentMonth.value, 1);
    } else if (view.value === 'month') {
      currentMonth.value =
        dir > 0 ? addYears(currentMonth.value, 1) : subYears(currentMonth.value, 1);
    } else {
      currentMonth.value =
        dir > 0 ? addYears(currentMonth.value, 12) : subYears(currentMonth.value, 12);
    }
  };

  const selectYear = (y: number) => {
    currentMonth.value = setYear(currentMonth.value, y);
    view.value = 'month';
  };

  const selectMonth = (m: number) => {
    currentMonth.value = setMonth(currentMonth.value, m);
    view.value = 'day';
  };

  return {
    currentMonth,
    view,
    daysInMonth,
    yearRange,
    navigate,
    selectYear,
    selectMonth,
  };
};
