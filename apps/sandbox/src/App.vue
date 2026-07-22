<script setup lang="ts">
import { ref } from 'vue'
import { useGsap } from '@weegoos/core'
import gsap from 'gsap'
;(window as any).gsap = gsap

// Состояние для проверки размонтирования и ctx.revert()
const isCardVisible = ref(true)

const containerRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const glowRef = ref<HTMLElement | null>(null)
const badgeRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)

const titleText = "Тест GSAP Context в App.vue"

useGsap((ctx) => {
  if (!cardRef.value) return

  gsap.set([badgeRef.value, textRef.value], { y: 30, opacity: 0 })
  gsap.set(cardRef.value, { scale: 0.85, opacity: 0, rotateX: 20, rotateY: -20 })

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

  tl.to(cardRef.value, {
    scale: 1,
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    duration: 1.2,
    clearProps: 'transform'
  })
  .to(badgeRef.value, {
    y: 0,
    opacity: 1,
    duration: 0.8,
  }, '-=0.8')
  .from('.char', {
    y: 50,
    opacity: 0,
    rotateX: -90,
    stagger: 0.02,
    duration: 0.8,
  }, '-=0.6')
  .to(textRef.value, {
    y: 0,
    opacity: 1,
    duration: 0.8,
  }, '-=0.5')

  const xTo = gsap.quickTo(cardRef.value, 'rotationY', { duration: 0.4, ease: 'power3' })
  const yTo = gsap.quickTo(cardRef.value, 'rotationX', { duration: 0.4, ease: 'power3' })
  
  const glowX = glowRef.value ? gsap.quickTo(glowRef.value, 'x', { duration: 0.2, ease: 'power2' }) : null
  const glowY = glowRef.value ? gsap.quickTo(glowRef.value, 'y', { duration: 0.2, ease: 'power2' }) : null

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.value) return
    const rect = cardRef.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = -((y - centerY) / centerY) * 16
    const rotateY = ((x - centerX) / centerX) * 16

    xTo(rotateY)
    yTo(rotateX)

    if (glowX && glowY) {
      glowX(x)
      glowY(y)
    }
  }

  const handleMouseLeave = () => {
    xTo(0)
    yTo(0)
  }

  const el = cardRef.value
  el.addEventListener('mousemove', handleMouseMove)
  el.addEventListener('mouseleave', handleMouseLeave)

  ctx.add(() => {
    el.removeEventListener('mousemove', handleMouseMove)
    el.removeEventListener('mouseleave', handleMouseLeave)
  })
}, { scope: containerRef })
</script>

<template>
  <main ref="containerRef" class="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 perspective-1000 overflow-hidden gap-6">
    <!-- Кнопка для проверки размонтирования и очистки памяти -->
    <button 
      @click="isCardVisible = !isCardVisible"
      class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-lg shadow-indigo-500/25 z-20"
    >
      {{ isCardVisible ? 'Скрыть карточку (Revert)' : 'Показать карточку' }}
    </button>

    <div
      v-if="isCardVisible"
      ref="cardRef"
      class="relative w-full max-w-lg p-10 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl cursor-pointer transform-gpu overflow-hidden"
      style="transform-style: preserve-3d;"
    >
      <div
        ref="glowRef"
        class="absolute w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
      ></div>

      <div class="relative z-10 space-y-6" style="transform: translateZ(40px);">
        <div ref="badgeRef" class="inline-block px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold tracking-wider uppercase border border-indigo-500/20 shadow-inner">
          WEEGOOS CORE • MEMORY LEAK TEST
        </div>
        
        <h2 ref="titleRef" class="text-3xl font-extrabold tracking-tight flex flex-wrap" style="perspective: 500px;">
          <span v-for="(char, index) in titleText" :key="index" class="char inline-block whitespace-pre">
            {{ char }}
          </span>
        </h2>
        
        <p ref="textRef" class="text-slate-400 text-base leading-relaxed">
          Нажми кнопку выше, чтобы уничтожить компонент. Сработает <code class="text-indigo-300 font-semibold">ctx.revert()</code>, очистив все анимации и слушатели событий.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1200px;
}
</style>