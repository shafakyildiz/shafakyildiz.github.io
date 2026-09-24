<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useUiStore } from '@/stores/ui'
import { usePortfolioStore } from '@/stores/portfolio'

const ui = useUiStore()
const portfolio = usePortfolioStore()
const media = ref(null)
const heroImage = '/images/bg_1.jpg'
const orbImage = '/images/bg_3.jpg'

function onScroll() {
  if (!media.value) return
  const y = Math.min(window.scrollY, window.innerHeight)
  media.value.style.transform = `translate3d(0, ${y * 0.28}px, 0)`
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section id="home" class="hero">
    <div ref="media" class="hero-media">
      <img :src="heroImage" alt="" />
      <div class="mist mist-a" aria-hidden="true"></div>
      <div class="mist mist-b" aria-hidden="true"></div>
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="grain" aria-hidden="true"></div>
    </div>

    <button class="orb" type="button" aria-label="Enter" @click="ui.goTo('craft')">
      <img :src="orbImage" alt="" />
      <span>Enter</span>
    </button>

    <div class="hero-copy">
      <p class="hero-kicker hero-fade">Software, composed with care</p>
      <h1 class="hero-title">
        <span class="line"><span>{{ portfolio.profile.firstName }}</span></span>
        <span class="line line-sub"><span>{{ portfolio.profile.lastName }}</span></span>
      </h1>
      <div class="hero-foot hero-fade">
        <span>{{ portfolio.profile.role }}</span>
        <span>{{ portfolio.profile.coordinates }}</span>
        <span>{{ portfolio.profile.location }}</span>
      </div>
    </div>
  </section>
</template>
