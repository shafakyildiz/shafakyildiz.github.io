<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
const track = ref(null)
const atStart = ref(true)
const atEnd = ref(false)
let dragging = false
let startX = 0
let origin = 0

function updateEnds() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}

function move(direction) {
  const el = track.value
  const card = el?.querySelector('.work-card')
  if (!el || !card) return
  el.scrollBy({ left: direction * (card.offsetWidth + 22), behavior: 'smooth' })
}

function onDown(event) {
  dragging = true
  track.value.classList.add('is-dragging')
  startX = event.pageX || event.touches?.[0]?.pageX || 0
  origin = track.value.scrollLeft
}

function onMove(event) {
  if (!dragging) return
  const x = event.pageX || event.touches?.[0]?.pageX || 0
  track.value.scrollLeft = origin - (x - startX)
}

function onUp() {
  dragging = false
  track.value?.classList.remove('is-dragging')
}

onMounted(() => {
  updateEnds()
  track.value?.addEventListener('scroll', updateEnds, { passive: true })
  window.addEventListener('resize', updateEnds)
})
onUnmounted(() => {
  track.value?.removeEventListener('scroll', updateEnds)
  window.removeEventListener('resize', updateEnds)
})
</script>

<template>
  <section id="work" class="work">
    <div class="work-head">
      <div>
        <p class="kicker reveal">02 — Selected work</p>
        <h2 class="reveal" style="--d: 0.08s">A few products from the last years.</h2>
      </div>
      <div class="work-controls reveal" style="--d: 0.12s">
        <button type="button" aria-label="Previous" :disabled="atStart" @click="move(-1)">←</button>
        <button type="button" aria-label="Next" :disabled="atEnd" @click="move(1)">→</button>
      </div>
    </div>

    <div
      ref="track"
      class="work-track"
      @mousedown="onDown"
      @mousemove="onMove"
      @mouseup="onUp"
      @mouseleave="onUp"
      @touchstart.passive="onDown"
      @touchmove.passive="onMove"
      @touchend="onUp"
    >
      <article v-for="project in portfolio.projects" :key="project.name" class="work-card">
        <div class="work-media">
          <img :src="project.image" :alt="project.name" :style="{ objectPosition: project.position }" />
          <span>{{ project.tag }}</span>
        </div>
        <div class="work-body">
          <h3>{{ project.name }}</h3>
          <p class="work-stack">{{ project.stack }}</p>
          <p>{{ project.summary }}</p>
          <a v-if="project.href" class="text-link" :href="project.href" target="_blank" rel="noreferrer">Visit</a>
          <span v-else class="work-private">Private engagement</span>
        </div>
      </article>
    </div>
  </section>
</template>
