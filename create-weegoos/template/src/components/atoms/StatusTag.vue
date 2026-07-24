<script setup lang="ts">
defineProps<{
  variant?: 'green' | 'purple'
}>()
</script>

<template>
  <span :class="['card-tag', variant === 'purple' ? 'purple-tag' : 'green-tag']">
    <slot />
  </span>
</template>

<style scoped>
.card-tag {
  align-self: flex-start;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 8px;
  border-radius: 4px;
}
.purple-tag {
  color: #818cf8;
  background: rgba(129, 140, 248, 0.08);
}
.green-tag {
  color: #00dc82;
  background: rgba(0, 220, 130, 0.08);
}
</style>