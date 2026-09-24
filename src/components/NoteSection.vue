<script setup>
import { usePortfolioStore } from '@/stores/portfolio'

const portfolio = usePortfolioStore()
const portrait = '/images/author.jpg'
</script>

<template>
  <section id="note" class="note">
    <figure class="reveal">
      <img :src="portrait" alt="Safak Yildiz" />
      <figcaption>{{ portfolio.profile.coordinates }}</figcaption>
    </figure>
    <div class="note-copy">
      <p class="kicker reveal">03 — A note</p>
      <p class="statement reveal" style="--d: 0.08s">{{ portfolio.statement }}</p>
      <p class="note-by reveal" style="--d: 0.16s">
        <strong>{{ portfolio.profile.firstName }} {{ portfolio.profile.lastName }}</strong>
        <span>{{ portfolio.profile.role }}</span>
      </p>
    </div>
  </section>
</template>
