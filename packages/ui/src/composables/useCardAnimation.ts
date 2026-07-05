import { ref, type Ref } from 'vue';
import { gsap } from 'gsap';

export function useCardAnimation(cardRef: Ref<HTMLElement | null>, props: any) {
  const glowX = ref(0);
  const glowY = ref(0);
  const isHovered = ref(false);

  // Хелпер для проверки мобильных устройств
  const isTouchDevice = () => {
    return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  };

  // Проверка системной настройки "Уменьшение движения" (Reduced Motion) ⭐
  const isReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const handleMouseEnter = (e: MouseEvent) => {
    if (props.disabled) return;
    if (isTouchDevice() && !props.tiltOnTouch) return;

    isHovered.value = true;

    // Масштабируем только если Reduced Motion выключен
    if (props.scaleOnHover && !isReducedMotion()) {
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

    const clientX = isTouch ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = isTouch ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const rect = cardRef.value.getBoundingClientRect();
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    glowX.value = x;
    glowY.value = y;

    // Наклоняем (tilt) только если Reduced Motion выключен
    if (props.tilt && !isReducedMotion()) {
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

    // Плавный сброс. Если Reduced Motion включен, сброс сработает мгновенно без анимации наклона
    gsap.to(cardRef.value, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: isReducedMotion() ? 0 : props.hoverDuration,
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