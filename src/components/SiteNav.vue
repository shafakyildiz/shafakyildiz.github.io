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
      <button
        class="theme-toggle"
        type="button"
        :aria-label="ui.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="ui.toggleTheme()"
      >
        <svg v-if="ui.theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.5 3.2a8.5 8.5 0 1 0 6.3 12.8A7 7 0 0 1 14.5 3.2Z" />
        </svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6" />
        </svg>
      </button>
      <a class="nav-cta" href="#contact" @click.prevent="ui.goTo('contact')">Work with me</a>
      <button class="nav-burger" type="button" :aria-expanded="ui.menuOpen" @click="ui.toggleMenu()">
        Menu
      </button>
    </div>
  </header>
</template>
