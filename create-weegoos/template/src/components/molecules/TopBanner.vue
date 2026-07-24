<template>
  <div class="top-banner">
    <div class="banner-pill">
      <span class="live-dot"></span>
      <span class="banner-text">Weegoos v1.0 Runtime Release</span>
      <span class="banner-divider">/</span>
      <a href="#showcase" class="banner-link">
        Попробовать интерактивный 3D-Tilt
        <svg class="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.top-banner {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 14px;
  z-index: 20;
}

.banner-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(15, 15, 20, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 220, 130, 0.05);
  transition: all 0.3s ease;
}

.banner-pill:hover {
  border-color: rgba(0, 220, 130, 0.3);
  box-shadow: 0 4px 25px rgba(0, 220, 130, 0.15);
}

.live-dot {
  width: 6px;
  height: 6px;
  background-color: #00dc82;
  border-radius: 50%;
  box-shadow: 0 0 8px #00dc82;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 220, 130, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(0, 220, 130, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 220, 130, 0); }
}

.banner-text {
  color: #d1d5db;
  font-weight: 500;
}

.banner-divider {
  color: #4b5563;
}

.banner-link {
  color: #00dc82;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.arrow {
  transition: transform 0.2s ease;
}

.banner-link:hover .arrow {
  transform: translateX(3px);
}
</style>