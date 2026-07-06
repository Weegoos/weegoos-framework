import type { App } from 'vue';
import WButton from './src/WButton.vue';
import WCard from './src/WCard.vue';
import WInput from './src/WInput.vue';
import WDatePicker from './src/WDatePicker.vue';

// Экспортируем компоненты по отдельности (для ручного импорта при желании)
export { WButton, WCard, WInput, WDatePicker };

// Экспортируем дефолтный плагин для глобальной регистрации
export default {
  install(app: App) {
    app.component('WButton', WButton);
    app.component('WCard', WCard);
    app.component('WInput', WInput);
    app.component('WDatePicker', WDatePicker);
  },
};
