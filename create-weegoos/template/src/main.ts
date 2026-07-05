import { createApp } from 'vue';
import App from './App.vue';

// Стили лежат внутри src/styles/ — тут всё правильно
import "C:/Users/user/Desktop/weegoos/packages/ui/src/styles/weegoos.css";

// Главный индексный файл плагина лежит прямо в корне ui/
import WeegoosUI from "C:/Users/user/Desktop/weegoos/packages/ui/index.ts"; 

const app = createApp(App);

app.use(WeegoosUI);
app.mount('#app');