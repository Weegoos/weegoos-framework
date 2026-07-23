import { createApp } from 'vue';
import App from './App.vue';
import { WeegoosPlugin } from '@weegoos/core';

// Импортируем компоненты напрямую из исходников UI-пакета
import WeegoosUI from '../../../packages/ui/index.ts';

// ИЗМЕНЕНИЕ: Импортируем готовый скомпилированный CSS из папки dist
import '../../../packages/ui/dist/style.css';

import './styles/main.css';

const app = createApp(App);

app.use(WeegoosPlugin, {
  defaultDuration: 0.4,
  debug: true
});

app.use(WeegoosUI);
app.mount('#app');