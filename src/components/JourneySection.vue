<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
const plateau = '/images/bg_1.jpg'
const root = ref(null)
const shown = ref(portfolio.stats.map(() => 0))
let played = false
let frame

function easeOut(t) {
  return 1 - (1 - t) ** 3
}

function play() {
  if (played) return
  played = true
  const start = performance.now()
  const duration = 1200
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration)
    shown.value = portfolio.stats.map((stat) => Math.round(stat.value * easeOut(t)))
    if (t < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

let observer
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    shown.value = portfolio.stats.map((stat) => stat.value)
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) play()
    },
    { threshold: 0.4 },
  )
  if (root.value) observer.observe(root.value)
})
onUnmounted(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
})

function format(value, target) {
  const text = String(value)
  return target >= 10 ? text : text.padStart(2, '0')
}
</script>

<template>
  <section id="journey" ref="root" class="journey">
    <div class="journey-bg" :style="{ backgroundImage: `url(${plateau})` }" aria-hidden="true"></div>
    <div class="journey-inner">
      <p class="kicker reveal">05 — The journey</p>
      <div class="route reveal" style="--d: 0.08s">
        <span>ANK</span>
        <i></i>
        <span>LMT</span>
      </div>
      <p class="route-caption reveal">Ankara — Limak Technology · Present</p>

      <ul class="stats">
        <li v-for="(stat, index) in portfolio.stats" :key="stat.label" class="reveal" :style="{ '--d': `${0.1 + index * 0.08}s` }">
          <strong>{{ format(shown[index], stat.value) }}{{ stat.suffix || '' }}</strong>
          <span>{{ stat.label }}</span>
        </li>
      </ul>

      <ol class="roles">
        <li v-for="(role, index) in portfolio.experience" :key="role.company" class="reveal" :style="{ '--d': `${index * 0.08}s` }">
          <div>
            <h3>{{ role.company }}</h3>
            <p>{{ role.role }}</p>
          </div>
          <time>{{ role.dates }}</time>
          <p>{{ role.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
