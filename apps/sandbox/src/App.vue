<script setup lang="ts">
import { WCard, COLOR_MAP } from '@weegoos/ui';
</script>

<template>
  <main class="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 gap-4">
    <WCard class="w-full max-w-md border border-blue-500/30 bg-[--wg-color-primary]">
      <h2 class="text-lg font-bold text-blue-400">Сквозной импорт успешен!</h2>
      <p class="text-slate-300 text-sm">Пакет @weegoos/ui корректно подтягивается из dist.</p>
    </WCard>
  </main>
</template>