<script setup>
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
</script>

<template>
  <section id="craft" class="lede">
    <p class="kicker reveal">01 — The craft</p>
    <h2 class="reveal" style="--d: 0.08s">
      Vast in scope, <em>exact in the details</em> — software shaped for the people who rely on it.
    </h2>
    <p class="lede-body reveal" style="--d: 0.16s">{{ portfolio.bio }}</p>
  </section>
</template>
