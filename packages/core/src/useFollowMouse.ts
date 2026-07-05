import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

export function useFollowMouse(inertia = 0.1) {
  // Координаты, которые будут плавно лететь за курсором
  const x = ref(0);
  const y = ref(0);

  // Реальные координаты мыши в текущий момент
  const targetX = ref(0);
  const targetY = ref(0);

  // Функция-тикер, выполняющаяся на каждый кадр анимации (60+ FPS)
  const updatePosition = () => {
    // Формула сглаживания: текущее + (цель - текущее) * коэф_инерции
    x.value += (targetX.value - x.value) * inertia;
    y.value += (targetY.value - y.value) * inertia;
  };

  const onMouseMove = (e: MouseEvent) => {
    targetX.value = e.clientX;
    targetY.value = e.clientY;
  };

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove);
    // Подключаем обновление позиции к высокопроизводительному тикеру GSAP
    gsap.ticker.add(updatePosition);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove);
    gsap.ticker.remove(updatePosition);
  });

  return { x, y };
}