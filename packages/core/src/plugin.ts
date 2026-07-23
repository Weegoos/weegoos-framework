import { App, Plugin } from 'vue';
import { WeegoosOptions } from './types';

const defaultOptions: WeegoosOptions = {
  defaultDuration: 0.4,
  defaultEase: 'power2.out',
  debug: false,
};

export const WeegoosPlugin: Plugin = {
  install(app: App, options: WeegoosOptions = {}) {
    // Смерджим дефолтные опции с теми, что передал пользователь
    const config = { ...defaultOptions, ...options };

    // Прокидываем конфиг через provide, чтобы UI-компоненты (как WButton) могли его inject-ить
    app.provide('weegoos-config', config);

    if (config.debug) {
      console.log('⚡️ [Weegoos] Фреймворк успешно инициализирован!', config);
    }
  },
};
