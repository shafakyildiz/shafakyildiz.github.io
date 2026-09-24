<script setup>
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
</script>

<template>
  <section id="practice" class="practice">
    <div class="section-intro">
      <p class="kicker reveal">04 — The practice</p>
      <h2 class="reveal" style="--d: 0.08s">Three rooms, one standard.</h2>
    </div>
    <ol>
      <li v-for="(item, index) in portfolio.disciplines" :key="item.title" class="reveal" :style="{ '--d': `${index * 0.08}s` }">
        <span class="idx">{{ item.index }}</span>
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </div>
        <ul>
          <li v-for="tool in item.tools" :key="tool">{{ tool }}</li>
        </ul>
      </li>
    </ol>
  </section>
</template>
