import type { App } from 'vue';
import WButton from './src/WButton.vue';
import WCard from './src/WCard.vue';

// Экспортируем компоненты по отдельности (для ручного импорта при желании)
export { WButton, WCard };

// Экспортируем дефолтный плагин для глобальной регистрации
export default {
  install(app: App) {
    app.component('WButton', WButton);
    app.component('WCard', WCard);
  }
};