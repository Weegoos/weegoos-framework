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
        <span style="color: #818cf8; font-family: sans-serif; font-weight: 600;">Custom Design</span>
        <!-- Кнопка доступна сразу без импорта! -->
        <WButton magnetic radius="80">Click Me</WButton>
      </div>
    </WCard>

    <WCard width="250px" height="150px">
      <span style="color: white; font-family: sans-serif;">Default Weegoos Style</span>
    </WCard>

  </div>
</template>

<script setup>
// Больше никаких импортов компонентов! Здесь чисто.
</script>

<style>

</style>