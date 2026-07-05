import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import { gsap } from 'gsap';

export function useCardAnimation(cardRef: Ref<HTMLElement | null>, props: any) {
  const glowX = ref(0);
  const glowY = ref(0);
  const isHovered = ref(false);

  // Хелпер для проверки мобильных устройств
  const isTouchDevice = () => {
    return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  };

  const handleMouseEnter = (e: MouseEvent) => {
    if (props.disabled) return;
    if (isTouchDevice() && !props.tiltOnTouch) return;

    isHovered.value = true;

    if (props.scaleOnHover) {
      gsap.to(cardRef.value, {
        scale: props.hoverScale,
        duration: props.hoverDuration,
        ease: props.hoverEase,
        overwrite: 'auto'
      });
    }
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (props.disabled || !cardRef.value) return;
    
    const isTouch = 'touches' in e;
    if (isTouch && !props.tiltOnTouch) return;

    // Извлекаем нативный клиентский X и Y в зависимости от типа события
    const clientX = isTouch ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = isTouch ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const rect = cardRef.value.getBoundingClientRect();
    
    // Координаты курсора/пальца относительно самой карточки
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    glowX.value = x;
    glowY.value = y;

    if (props.tilt) {
      // Вычисляем угол наклона от центра карточки
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * props.maxTilt;
      const rotateY = ((x - centerX) / centerX) * props.maxTilt;

      gsap.to(cardRef.value, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };

  const handleMouseLeave = (e?: MouseEvent | TouchEvent) => {
    isHovered.value = false;
    if (!cardRef.value) return;

    // Плавный сброс трансформации в дефолтное состояние
    gsap.to(cardRef.value, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: props.hoverDuration,
      ease: props.hoverEase,
      overwrite: 'auto'
    });
  };

  return {
    glowX,
    glowY,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave
  };
}