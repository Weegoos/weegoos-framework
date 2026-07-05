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

<!-- 9. ТЕСТ: Глубокая кастомная неоновая тень -->
<WCard 
  width="400px" 
  height="250px"
  background="#0a0712"
  borderColor="rgba(139, 92, 246, 0.08)"
  hoverBorderColor="rgba(139, 92, 246, 0.3)"
  glowColor="rgba(139, 92, 246, 0.15)"
  glowSize="350"
  borderRadius="16px"
  padding="32px"
  :hoverScale="1.02"
  shadow="0 4px 24px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(139, 92, 246, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.03)"
  hoverShadow="0 40px 80px -16px rgba(0, 0, 0, 0.8), 0 0 50px -10px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.07)"
>
  <template #header>
    <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #a78bfa; opacity: 0.85;">
      Premium Feature
    </div>
    <h3 style="font-size: 20px; font-weight: 500; letter-spacing: -0.02em; color: #ffffff; margin: 0;">
      Custom Purple Shadows
    </h3>
  </template>

  <!-- Описание автоматически падает в центральную зону -->
  <p style="font-size: 14px; line-height: 1.5; color: #9ca3af; margin: 8px 0 0 0; font-weight: 400;">
    Многослойные тени и внутреннее тиснение `inset` создают иллюзию физического стекла.
  </p>

  <template #footer>
    <span style="font-size: 13px; color: #6b7280; font-weight: 400;">Weegoos Engine v1.0</span>
    <WButton magnetic radius="60" style="--w-btn-bg: #8b5cf6;">Explore</WButton>
  </template>
</WCard>

<WCard 
  width="400px" 
  height="200px"
  cursor="pointer"
>
  <p style="color: white;">Эта карточка кликабельна (cursor="pointer")</p>
</WCard>

<WCard 
  width="400px" 
  height="200px"
  cursor="grab"
>
  <p style="color: white;">Эту карточку можно перетаскивать (cursor="grab")</p>
</WCard>

<!-- Резкий, ультрабыстрый отклик (например, для игровых дашбордов) -->
<WCard 
  width="400px" 
  height="200px"
  transition="all 0.1s linear"
>
  <p style="color: white;">Ультрабыстрый переход (transition="all 0.1s linear")</p>
</WCard>

<!-- Инертный, глубокий и медленный переход -->
<WCard 
  width="400px" 
  height="200px"
  transition="all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
>
  <p style="color: white;">Медленный инерционный переход</p>
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