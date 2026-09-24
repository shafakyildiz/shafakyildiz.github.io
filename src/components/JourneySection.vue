<script setup>
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
const open = ref(0)
</script>

<template>
  <section id="experience" class="experience">
    <p class="kicker reveal">Experience</p>
    <h2 class="reveal">Where the work has been.</h2>
    <ol>
      <li v-for="(role, index) in portfolio.experience" :key="role.company" class="reveal">
        <button type="button" :aria-expanded="open === index" @click="open = open === index ? -1 : index">
          <span>{{ role.company }}</span>
          <em>{{ role.role }}</em>
          <time>{{ role.dates }}</time>
        </button>
        <p v-show="open === index">{{ role.text }}</p>
      </li>
    </ol>
    <p class="experience-more reveal">
      … and more
      <span>Earlier roles aren’t listed here. The thread continues.</span>
    </p>
  </section>
</template>
