<script setup>
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-grid">
      <div>
        <p class="footer-mark">Safak Yildiz</p>
        <p>Software, composed with care, from Ankara.</p>
      </div>
      <div>
        <p class="kicker">Work</p>
        <a v-for="project in portfolio.projects" :key="project.name" href="#work">{{ project.name }}</a>
      </div>
      <div>
        <p class="kicker">Visit</p>
        <a href="#craft">About</a>
        <a href="#practice">Practice</a>
        <a href="#journey">Journey</a>
        <a href="#process">Process</a>
      </div>
      <div>
        <p class="kicker">Connect</p>
        <a :href="`mailto:${portfolio.profile.email}`">{{ portfolio.profile.email }}</a>
        <a v-for="link in portfolio.socials" :key="link.label" :href="link.href" target="_blank" rel="noreferrer">
          {{ link.label }}
        </a>
      </div>
    </div>
    <div class="footer-bar">
      <span>© {{ year }} Safak Yildiz</span>
      <span>{{ portfolio.profile.coordinates }}</span>
    </div>
  </footer>
</template>
