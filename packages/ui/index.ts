import type { App } from 'vue';

import './src/styles/tailwind.css';
export { default as weegoosPlugin } from './src/plugins/weegoos-plugin';

import WButton from './src/elements/WButton.vue';
import WCard from './src/elements/WCard.vue';
import WInput from './src/elements/WInput.vue';
import WDatePicker from './src/elements/WDatePicker.vue';
import WCalendar from './src/elements/WCalendar.vue';
import WBadge from './src/elements/WBadge.vue';

// Явно экспортируем и компоненты, и их типы для IDE
export {
  WButton,
  WCard,
  WInput,
  WDatePicker,
  WCalendar,
  WBadge,
};

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