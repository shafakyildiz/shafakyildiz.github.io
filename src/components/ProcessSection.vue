<script setup>
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
</script>

<template>
  <section id="process" class="process">
    <div class="section-intro">
      <p class="kicker reveal">06 — How it works</p>
      <h2 class="reveal" style="--d: 0.08s">From the first note to a calm release.</h2>
    </div>
    <ol>
      <li v-for="(step, index) in portfolio.process" :key="step.index" class="reveal" :style="{ '--d': `${(index % 2) * 0.08}s` }">
        <span>{{ step.index }}</span>
        <h3>{{ step.title }}</h3>
        <p>{{ step.text }}</p>
      </li>
    </ol>
  </section>
</template>
