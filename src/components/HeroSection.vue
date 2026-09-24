<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
const words = ['Ships', 'Builds', 'Scales']
const word = ref(words[0])
let timer

onMounted(() => {
  let i = 0
  timer = window.setInterval(() => {
    i = (i + 1) % words.length
    word.value = words[i]
  }, 2200)
})
onUnmounted(() => window.clearInterval(timer))
</script>

<template>
  <section id="home" class="hero">
    <div class="sun" aria-hidden="true"></div>
    <div class="cloud cloud-a" aria-hidden="true"></div>
    <div class="cloud cloud-b" aria-hidden="true"></div>
    <div class="cloud cloud-c" aria-hidden="true"></div>
    <p class="hero-kicker">Hello, I’m {{ portfolio.profile.firstName }} {{ portfolio.profile.lastName }}. An—</p>
    <h1>
      <span>Engineer who</span>
      <span class="hero-swap">
        <span :key="word" class="hero-word">{{ word }}</span>
      </span>
    </h1>
    <p class="hero-side">React / .NET / Node</p>
  </section>
</template>
