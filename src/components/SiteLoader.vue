<script setup>
import { onMounted, ref } from 'vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const show = ref(!ui.loaded)

function done(event) {
  if (event.propertyName !== 'transform') return
  if (ui.loaded) show.value = false
}

onMounted(() => {
  if (!show.value) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.setTimeout(() => ui.finishLoad(), reduce ? 0 : 900)
})
</script>

<template>
  <div v-if="show" class="loader" :class="{ 'is-done': ui.loaded }" @transitionend="done">
    <span class="loader-dot"></span>
    <p>Loading</p>
  </div>
</template>
