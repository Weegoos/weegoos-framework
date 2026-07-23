import { onMounted, onUnmounted, getCurrentInstance, unref, type Ref } from 'vue';
import gsap from 'gsap';

export interface GsapContextConfig {
  scope?: HTMLElement | string | Ref<HTMLElement | null | undefined>;
  dependencies?: any[];
}

export function useGsap(effect: (ctx: gsap.Context) => void, config?: GsapContextConfig) {
  const isClient = typeof window !== 'undefined' && getCurrentInstance() !== null;
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    if (!isClient) return;

    const resolvedScope = config?.scope ? unref(config.scope) : undefined;

    ctx = gsap.context((self) => {
      effect(self);
    }, resolvedScope as any);
  });

  onUnmounted(() => {
    if (ctx) {
      // Принудительно убиваем все анимации и quickTo-инстансы, зарегистрированные в контексте
      ctx.data.forEach((anim) => {
        if (anim && typeof (anim as any).kill === 'function') {
          (anim as any).kill();
        }
      });
      ctx.revert();
    }
  });

  return {
    getContext: () => ctx,
  };
}