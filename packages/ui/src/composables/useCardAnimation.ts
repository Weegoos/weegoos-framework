import { ref, type Ref } from 'vue';
import { gsap } from 'gsap';

interface AnimationOptions {
  tilt: boolean;
  glow: boolean;
  scaleOnHover: boolean;
  maxTilt: number;
  hoverScale: number;
  hoverDuration: number;
  hoverEase: string;
}

export function useCardAnimation(
  cardRef: Ref<HTMLElement | null>,
  options: AnimationOptions
) {
  const glowX = ref(0);
  const glowY = ref(0);
  const isHovered = ref(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.value) return;

    const rect = cardRef.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (options.glow) {
      glowX.value = x;
      glowY.value = y;
    }

    if (options.tilt) {
      const normX = (x / rect.width) - 0.5;
      const normY = (y / rect.height) - 0.5;

      const tiltX = -(normY * options.maxTilt);
      const tiltY = normX * options.maxTilt;

      gsap.to(cardRef.value, {
        rotateX: tiltX,
        rotateY: tiltY,
        duration: options.hoverDuration,
        ease: options.hoverEase,
        overwrite: 'auto'
      });
    }
  };

  const handleMouseEnter = () => {
    isHovered.value = true;
    
    if (cardRef.value && options.scaleOnHover) {
      gsap.to(cardRef.value, {
        scale: options.hoverScale,
        z: 10,
        duration: options.hoverDuration,
        ease: options.hoverEase
      });
    }
  };

  const handleMouseLeave = () => {
    isHovered.value = false;
    if (!cardRef.value) return;

    const resetTargets: gsap.TweenVars = {
      duration: options.hoverDuration * 1.5,
      ease: options.hoverEase,
      overwrite: 'auto'
    };

    if (options.tilt) {
      resetTargets.rotateX = 0;
      resetTargets.rotateY = 0;
    }
    
    if (options.scaleOnHover) {
      resetTargets.scale = 1;
      resetTargets.z = 0;
    }

    if (options.tilt || options.scaleOnHover) {
      gsap.to(cardRef.value, resetTargets);
    }
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