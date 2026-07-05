<template>
<div>
  <WButton width="240px">
    Continue
</WButton>
<WButton width="100%">
    Login
</WButton>
<WButton width="48" height="48" magnetic>
    +
</WButton>
</div>
</template>

<script setup>
import { ref } from 'vue';

const currentPreset = ref('glass');
</script>

<style scoped>
.test-container {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  background: #050505;
  color: white;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
section h2 { margin-bottom: 20px; color: #888; }
</style>