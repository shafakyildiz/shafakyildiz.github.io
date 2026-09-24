<script setup>
import { useUiStore } from '@/stores/ui'
import { usePortfolioStore } from '@/stores/portfolio'

const ui = useUiStore()
const portfolio = usePortfolioStore()
const portrait = '/images/author.jpg'
const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
]
</script>

<template>
  <header class="nav">
    <p class="nav-loc">{{ portfolio.profile.location }}</p>
    <nav class="nav-pill" aria-label="Primary">
      <img :src="portrait" alt="" />
      <a
        v-for="link in links"
        :key="link.id"
        :href="`#${link.id}`"
        :class="{ 'is-on': ui.activeSection === link.id }"
        @click.prevent="ui.goTo(link.id)"
      >{{ link.label }}</a>
    </nav>
    <div class="nav-end">
      <a class="nav-cta" href="#contact" @click.prevent="ui.goTo('contact')">Work with me</a>
      <button class="nav-burger" type="button" :aria-expanded="ui.menuOpen" @click="ui.toggleMenu()">
        Menu
      </button>
    </div>
  </header>
</template>
