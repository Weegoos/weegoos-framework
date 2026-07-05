import { createApp } from 'vue';
import App from './App.vue';
import { WeegoosPlugin } from '@weegoos/core';
import '@weegoos/ui/src/styles/weegoos.css';
import WeegoosUI from '../../../packages/ui/index.ts';
const app = createApp(App);

app.use(WeegoosPlugin, {
  defaultDuration: 0.4,
  debug: true
});

app.use(WeegoosUI)
app.mount('#app');