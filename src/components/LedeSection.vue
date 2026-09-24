<script setup>
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
const portrait = '/images/author.jpg'
</script>

<template>
  <section id="about" class="about">
    <figure class="reveal">
      <img :src="portrait" alt="Safak Yildiz" />
    </figure>
    <div>
      <p class="kicker reveal">About</p>
      <h2 class="reveal">{{ portfolio.years }} years building products people rely on.</h2>
      <p class="reveal">{{ portfolio.bio }}</p>
      <ul class="certs reveal">
        <li v-for="cert in portfolio.certifications" :key="cert">{{ cert }}</li>
      </ul>
      <ul class="chips reveal">
        <li v-for="item in portfolio.disciplines" :key="item.title">
          <strong>{{ item.title }}</strong>
          <span>{{ item.tools.join(' · ') }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
