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
    <button ref="closeBtn" type="button" class="menu-close" @click="ui.closeMenu()">Close</button>
    <nav aria-label="Full menu">
      <a
        v-for="item in portfolio.navigation"
        :key="item.id"
        :href="`#${item.id}`"
        @click.prevent="ui.goTo(item.id)"
      >
        <em>{{ item.index }}</em>{{ item.label }}
      </a>
    </nav>
  </div>
</template>
