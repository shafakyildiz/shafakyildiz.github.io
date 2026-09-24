<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const hidden = ref(false)
const solid = ref(false)
let lastY = 0

const tone = computed(() => (solid.value || ui.menuOpen ? 'is-solid' : ''))

function onScroll() {
  const y = window.scrollY
  solid.value = y > window.innerHeight * 0.72
  hidden.value = y > lastY && y > 140 && !ui.menuOpen
  lastY = y
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="[tone, { 'is-hidden': hidden && !ui.menuOpen }]">
    <a class="nav-mark" href="#home" @click.prevent="ui.goTo('home')">Safak</a>
    <nav class="nav-links" aria-label="Primary">
      <a href="#work" @click.prevent="ui.goTo('work')">Work</a>
      <a href="#practice" @click.prevent="ui.goTo('practice')">Practice</a>
      <a href="#craft" @click.prevent="ui.goTo('craft')">About</a>
    </nav>
    <div class="nav-end">
      <a class="nav-quiet" href="#journey" @click.prevent="ui.goTo('journey')">Journey</a>
      <a class="nav-pill" href="#contact" @click.prevent="ui.goTo('contact')">Enquire</a>
      <button class="nav-menu" type="button" :aria-expanded="ui.menuOpen" @click="ui.toggleMenu()">
        {{ ui.menuOpen ? 'Close' : 'Menu' }}
      </button>
    </div>
  </header>
</template>
