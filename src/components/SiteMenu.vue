<script setup>
import { nextTick, ref, watch } from 'vue'
import { useUiStore } from '@/stores/ui'
import { usePortfolioStore } from '@/stores/portfolio'

const ui = useUiStore()
const portfolio = usePortfolioStore()
const closeBtn = ref(null)

function onKey(event) {
  if (event.key === 'Escape') ui.closeMenu()
}

watch(
  () => ui.menuOpen,
  async (open) => {
    document.body.classList.toggle('is-locked', open)
    if (open) {
      window.addEventListener('keydown', onKey)
      await nextTick()
      closeBtn.value?.focus()
    } else {
      window.removeEventListener('keydown', onKey)
    }
  },
)
</script>

<template>
  <div class="menu" :class="{ 'is-open': ui.menuOpen }" :inert="!ui.menuOpen">
    <div class="menu-bar">
      <span>Safak Yildiz</span>
      <button ref="closeBtn" type="button" @click="ui.closeMenu()">Close</button>
    </div>
    <nav class="menu-links" aria-label="Full menu">
      <a
        v-for="(item, index) in portfolio.navigation"
        :key="item.id"
        :href="`#${item.id}`"
        :style="{ '--i': index }"
        @click.prevent="ui.goTo(item.id)"
      >
        <em>{{ item.index }}</em>
        {{ item.label }}
      </a>
    </nav>
    <div class="menu-foot">
      <a :href="`mailto:${portfolio.profile.email}`">{{ portfolio.profile.email }}</a>
      <span>{{ portfolio.profile.location }}</span>
    </div>
  </div>
</template>
