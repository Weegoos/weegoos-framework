<script setup lang="ts">
import AppLogo from '../atoms/AppLogo.vue'
</script>

<template>
  <header class="wg-navbar">
    <AppLogo />
    <nav class="nav-links">
      <a href="#" class="active">Docs</a>
      <a href="#">Components</a>
      <a href="#">Showcase</a>
    </nav>
    <div class="nav-actions">
      <span class="version-badge">v1.0.0</span>
    </div>
  </header>
</template>

<style scoped>
.wg-navbar {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  color: #8a8f98;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.nav-links a:hover, .nav-links a.active {
  color: #ffffff;
}

.version-badge {
  font-size: 11px;
  font-family: monospace;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: #8a8f98;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
}
</style>