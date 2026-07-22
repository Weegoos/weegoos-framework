<script setup lang="ts">
import { WCard } from '@weegoos/ui';

// Проверка карточек с разными цветами из токенов COLOR_MAP
</script>

<template>
  <main class="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 gap-4">
    
    <div class="w-full max-w-md">
      <!-- Primary карточка -->
      <div class="wg-card bg-[--wg-color-primary] border border-blue-500/30">
        <h2 class="text-lg font-bold text-blue-400">Primary Card</h2>
        <p class="text-slate-300 text-sm">Использует цвет `primary` из COLOR_MAP.</p>
      </div>
    </div>

    <div class="w-full max-w-md">
      <!-- Success карточка -->
      <div class="wg-card bg-[--wg-color-success] border border-green-500/30">
        <h2 class="text-lg font-bold text-green-400">Success Card</h2>
        <p class="text-slate-300 text-sm">Использует цвет `success` из COLOR_MAP.</p>
      </div>
    </div>

    <WCard color="danger" radius="md" background="green" :tilt="true" preset="neon" class="w-full max-w-md">
      <!-- Danger карточка -->
      Batyr
    </WCard>

  </main>
</template>
