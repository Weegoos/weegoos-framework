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
        <WButton magnetic radius="80">Click Me</WButton>
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

    <!-- 8. ТЕСТ: Карточка вообще без тени (Абсолютно плоская) -->
<WCard 
  width="400px" 
  height="250px"
  :shadow="false"
  background="#16171e"
>
  <span style="color: #666; font-family: sans-serif;">Flat Style (:shadow="false")</span>
</WCard>

<!-- Тест 1: Статичная карточка-контейнер без анимаций и со специфичным бордером -->
<WCard 
  disabled
  borderWidth="2px"
  borderColor="#ef4444"
  width="400px"
  height="200px"
>
  <p style="color: white;">Анимации отключены (:disabled="true"). Граница 2px.</p>
</WCard>

<!-- Тест 2: Мягкое неоновое размытое свечение с кастомным Opacity -->
<WCard 
  width="400px" 
  height="200px"
  glowColor="rgba(244, 63, 94, 0.4)"
  :glowOpacity="0.8"
  glowBlur="20px"
  glowSize="300"
  borderRadius="16px"
>
  <p style="color: white;">Мягкий Glow с блюром 20px и opacity 0.8</p>
</WCard>

<!-- Тест 3: Карточка с выходящим за рамки контентом (overflow="visible") -->
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
  <!-- Используем HTML-сущности &lt; и &gt; -->
  <p style="color: #9ca3af;">Этот контейнер сгенерирован в DOM как тег &lt;article&gt;.</p>
</WCard>

<!-- Рендерится как полноценная кликабельная HTML-кнопка -->
<WCard as="button" width="400px" cursor="pointer">
  <span style="color: white;">Интерактивная кнопка-карточка</span>
</WCard>

  </div>
</template>

<script setup>
// Компоненты зарегистрированы глобально фреймворком. Код чист.
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