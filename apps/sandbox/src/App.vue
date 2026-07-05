<template>
  <div class="sandbox-root">
    
    <!-- 1. Полный фарш (Все эффекты по умолчанию) -->
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

    <!-- 2. Только свечение, без 3D-наклона (Стиль Stripe/Linear) -->
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

    <!-- 3. Только 3D-наклон, без неонового свечения -->
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

    <!-- 4. Строгая статика (Все эффекты отключены) -->
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

    <!-- 5. Дефолтный стиль Weegoos -->
    <WCard width="400px" height="250px">
      <span style="color: white; font-family: sans-serif;">Default Weegoos Style</span>
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