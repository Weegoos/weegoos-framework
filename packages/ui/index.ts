import type { App } from 'vue';
import WButton from '../ui/src/elements/WButton.vue';
import WCard from '../ui/src/elements/WCard.vue';
import WInput from '../ui/src/elements/WInput.vue';
import WDatePicker from '../ui/src/elements/WDatePicker.vue';
import WCalendar from '../ui/src/elements/WCalendar.vue';
import WBadge from '../ui/src/elements/WBadge.vue';

// Экспортируем компоненты по отдельности (для ручного импорта при желании)
export { WButton, WCard, WInput, WDatePicker, WCalendar, WBadge };

// Экспортируем дефолтный плагин для глобальной регистрации
export default {
  install(app: App) {
    app.component('WButton', WButton);
    app.component('WCard', WCard);
    app.component('WInput', WInput);
    app.component('WDatePicker', WDatePicker);
    app.component('WCalendar', WCalendar);
    app.component('WBadge', WBadge);
  },
};
