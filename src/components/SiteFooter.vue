<script setup>
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <p>Safak Yildiz · {{ portfolio.profile.location }} · {{ year }}</p>
    <nav aria-label="Social links">
      <a v-for="link in portfolio.socials" :key="link.label" :href="link.href" target="_blank" rel="noreferrer">{{ link.label }}</a>
    </nav>
  </footer>
</template>
