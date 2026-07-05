<template>
  <div class="sandbox-root">
    
    <WCard 
      width="400px" 
      height="250px"
      background="#0f0926"
      borderColor="rgba(129, 140, 248, 0.2)"
      hoverBorderColor="#818cf8"
      borderRadius="24px"
      glowColor="rgba(129, 140, 248, 0.3)"
      padding="32px"
    >
      <div style="display: flex; flex-direction: column; gap: 16px; height: 100%; justify-content: space-between;">
        <span style="color: #818cf8; font-family: sans-serif; font-weight: 600;">Full Interactive (Tilt + Glow + Scale)</span>
        <!-- ИСПРАВЛЕНО: добавлено двоеточие перед radius -->
        <WButton magnetic :radius="80">Click Me</WButton>
      </div>
    </WCard>

    <WCard 
      width="400px" 
      height="250px"
      :tilt="false"
      glowColor="rgba(0, 220, 130, 0.2)"
      hoverBorderColor="#00dc82"
    >
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <h3 style="color: white; font-family: sans-serif; margin: 0;">Flat 2D Glow</h3>
        <p style="color: #888; font-family: sans-serif; font-size: 14px; margin: 0;">
          Идеально для контентных сеток. Идеально четкий текст без 3D-размытия, но с реактивным неоновым ховером.
        </p>
      </div>
    </WCard>

    <WCard 
      width="400px" 
      height="250px"
      :glow="false"
      background="#1e1e24"
      hoverBorderColor="rgba(255,255,255,0.3)"
    >
      <div style="display: flex; flex-direction: column; justify-content: center; height: 100%; text-align: center;">
        <span style="color: #fff; font-family: sans-serif; font-size: 24px; font-weight: 300; letter-spacing: 1px;">
          PURE 3D TILT
        </span>
      </div>
    </WCard>

    <WCard 
      width="400px" 
      height="250px"
      :tilt="false"
      :glow="false"
      :scaleOnHover="false"
      background="#0d0d11"
      borderColor="rgba(255,255,255,0.03)"
      hoverBorderColor="rgba(255,255,255,0.1)"
    >
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <span style="color: #666; font-family: sans-serif; font-size: 12px; text-transform: uppercase;">Minimalist</span>
        <span style="color: #eee; font-family: sans-serif;">Полностью статичная премиальная карточка. Меняется только цвет бордера.</span>
      </div>
    </WCard>

    <WCard 
      width="400px" 
      height="250px"
      :hover-scale="1.03"
      :hover-duration="0.8"
      hover-ease="power4.out"
      background="#141414"
      glowColor="rgba(239, 68, 68, 0.15)"
      hoverBorderColor="#ef4444"
    >
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <h3 style="color: #ef4444; font-family: sans-serif; margin: 0;">Heavy Inertia</h3>
        <p style="color: #aaa; font-family: sans-serif; font-size: 14px; margin: 0;">
          Длительность 0.8с и кривая power4.out создают кинематографичный эффект тяжелого монолита, который плавно реагирует на курсор.
        </p>
      </div>
    </WCard>

    <WCard 
      width="400px" 
      height="250px"
      :hover-scale="1.05"
      :hover-duration="0.2"
      hover-ease="elastic.out(1, 0.75)"
      background="#091e1b"
      glowColor="rgba(56, 189, 248, 0.25)"
      hoverBorderColor="#38bdf8"
    >
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <h3 style="color: #38bdf8; font-family: sans-serif; margin: 0;">Snappy Elastic</h3>
        <p style="color: #aaa; font-family: sans-serif; font-size: 14px; margin: 0;">
          Масштаб 1.05, длительность 0.2с и встроенный эластик GSAP создают резкий, пружинистый игровой клик-эффект при наведении.
        </p>
      </div>
    </WCard>

    <WCard width="400px" height="250px">
      <span style="color: white; font-family: sans-serif;">Default Weegoos Style</span>
    </WCard>

    <WCard 
      width="400px" 
      height="250px"
      :shadow="false"
      background="#16171e"
    >
      <span style="color: #666; font-family: sans-serif;">Flat Style (:shadow="false")</span>
    </WCard>

    <WCard 
      disabled
      borderWidth="2px"
      borderColor="#ef4444"
      width="400px"
      height="200px"
    >
      <p style="color: white;">Анимации отключены (:disabled="true"). Граница 2px.</p>
    </WCard>

    <!-- Тест 2 -->
    <WCard 
      width="400px" 
      height="200px"
      glowColor="rgba(244, 63, 94, 0.4)"
      :glowOpacity="0.8"
      glowBlur="20px"
      :glowSize="300"
      borderRadius="16px"
    >
      <p style="color: white;">Мягкий Glow с блюром 20px и opacity 0.8</p>
    </WCard>

    <WCard 
      width="400px" 
      height="200px"
      overflow="visible"
      background="#1e1b4b"
    >
      <div style="position: absolute; top: -20px; right: -20px; background: #f59e0b; padding: 8px; border-radius: 8px; color: black; font-weight: bold;">
        Badge Out
      </div>
      <p style="color: white;">Элементы могут вылезать за пределы контейнера.</p>
    </WCard>

    <WCard as="section" width="400px">
      <h3 style="color: white; margin: 0;">Заголовок статьи</h3>
      <p style="color: #9ca3af;">Этот контейнер сгенерирован в DOM как тег &lt;article&gt;.</p>
    </WCard>

    <WCard as="button" width="400px" cursor="pointer">
      <span style="color: white;">Интерактивная кнопка-карточка</span>
    </WCard>

    <WCard width="400px" height="250px">
      <template #glow="{ x, y, isHovered }">
        <div 
          :style="{
            position: 'absolute',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(45deg, #f59e0b, #ef4444)',
            filter: 'blur(40px)',
            borderRadius: '30%',
            transform: `translate(${x - 75}px, ${y - 75}px)`,
            opacity: isHovered ? 0.6 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
          }"
        ></div>
      </template>

      <p style="color: white;">Карточка с абсолютно кастомным квадратным анимированным свечением.</p>
    </WCard>

    <WCard 
      @mouseenter="handleCardEnter"
      @mouseleave="handleCardLeave"
      width="350px"
    >
      <p style="color: white;">Интерактивная карточка с эмиттером событий.</p>
    </WCard>

<div class="sandbox-touch-demo" style="display: flex; flex-direction: column; gap: 32px; width: 100%;">
  
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <span style="color: #ef4444; font-family: sans-serif; font-weight: bold; font-size: 14px;">
      🔴 ДЕФОЛТ (tiltOnTouch = false)
    </span>
    <WCard 
      width="100%" 
      max-width="400px"
      height="220px"
      background="#111115"
      borderColor="rgba(255,255,255,0.05)"
    >
      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
        <p style="color: #9ca3af; font-family: sans-serif; font-size: 14px; margin: 0;">
          Попробуй водить пальцем по этой карточке.
        </p>
        <span style="color: #6b7280; font-family: monospace; font-size: 13px;">
          Статус: Эффект заблокирован, страница скроллится нативно.
        </span>
      </div>
    </WCard>
  </div>

  <div style="display: flex; flex-direction: column; gap: 8px;">
    <span style="color: #10b981; font-family: sans-serif; font-weight: bold; font-size: 14px;">
      🟢 С ТАЧ-ПОДДЕРЖКОЙ (tiltOnTouch = true)
    </span>
    <WCard 
      :tiltOnTouch="true" 
      width="100%" 
      max-width="400px"
      height="220px"
      background="#120d24"
      borderColor="rgba(168, 85,  purple, 0.2)"
      hoverBorderColor="#a855f7"
      glowColor="rgba(168, 85, 247, 0.4)"
      :glowSize="250"
    >
      <template #glow="{ x, y, isHovered }">
        <div style="position: absolute; padding: 16px; top: 0; right: 0; color: #a855f7; font-family: monospace; font-size: 12px; z-index: 10;">
          <div v-if="isHovered">
            X: {{ Math.round(x) }}px <br>
            Y: {{ Math.round(y) }}px
          </div>
          <div v-else style="color: #6b7280;">Палец убран</div>
        </div>
      </template>

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; position: relative; z-index: 2;">
        <div>
          <h4 style="color: white; font-family: sans-serif; margin: 0 0 8px 0;">3D Тач-Эффект</h4>
          <p style="color: #c084fc; font-family: sans-serif; font-size: 14px; margin: 0; line-height: 1.4;">
            Нажми и веди пальцем. Карточка начнет плавно изгибаться под нажатием, а фиолетовый неоновый свет будет следовать строго за твоим пальцем!
          </p>
        </div>
        <span style="color: #10b981; font-family: monospace; font-size: 13px; font-weight: bold;">
          Статус: Touch API слушает прикосновения
        </span>
      </div>
    </WCard>
  </div>

</div>

<div style="padding: 40px; background: #050505; min-height: 100vh; display: flex; gap: 20px; flex-wrap: wrap;">
    
    <!-- 1. Стандартная карточка (использует токены md/neutral) -->
    <WCard>
      <h3>Стандартная карточка</h3>
      <p>Использует значения по умолчанию из токенов.</p>
    </WCard>

    <!-- 2. Стеклянная карточка (вариант glass) -->
    <WCard variant="glass" radius="lg" size="lg">
      <template #header>
        <h3>Glassmorphism</h3>
      </template>
      <p>Эта карточка использует токен variant="glass".</p>
      <template #footer>
        <button>Действие</button>
      </template>
    </WCard>

    <!-- 3. Полностью кастомная карточка (перекрывает токены) -->
    <WCard 
      background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      border-color="transparent"
      border-radius="40px"
      padding="40px"
      :tilt="true"
      :glow="true"
      glow-color="rgba(255, 255, 255, 0.4)"
      style="color: white"
    >
      <h3>Кастомный стиль</h3>
      <p>Здесь мы перекрыли background, border и радиус своими значениями.</p>
    </WCard>

    <!-- 4. Карточка с ошибкой (color="danger") -->
    <WCard color="danger" elevation="sm" variant="solid" width="300px" height="150px" :glow="false">
      <h3>Ошибка системы</h3>
      <p>Использует токен цветовой схемы danger.</p>
    </WCard>

  </div>
  </div>
</template>

<script setup lang="ts">
const handleCardEnter = (event: MouseEvent) => {
  console.log('Пользователь навел мышь на премиум-карточку!', event);
};

const handleCardLeave = (event: MouseEvent) => {
  console.log('Мышь покинула пределы карточки');
};
</script>

<style scoped>
.sandbox-root {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 40px;
  background: #08080c;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>