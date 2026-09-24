<script setup>
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
</script>

<template>
  <section id="work" class="work">
    <div class="marquee" aria-hidden="true">
      <div>
        <span v-for="(tool, index) in [...portfolio.stack, ...portfolio.stack]" :key="`${tool}-${index}`">{{ tool }}</span>
      </div>
    </div>
    <h2 class="reveal">Selected work</h2>
    <div class="work-grid">
      <article v-for="project in portfolio.projects" :key="project.name" class="work-card reveal">
        <a v-if="project.href" :href="project.href" target="_blank" rel="noreferrer">
          <figure>
            <img :src="project.image" :alt="project.name" />
          </figure>
          <h3>{{ project.name }}</h3>
          <p>{{ project.summary }}</p>
        </a>
        <div v-else>
          <figure>
            <img :src="project.image" :alt="project.name" />
          </figure>
          <h3>{{ project.name }}</h3>
          <p>{{ project.summary }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
