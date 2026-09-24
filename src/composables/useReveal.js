import { onMounted, onUnmounted, watch } from 'vue'
import { useUiStore } from '@/stores/ui'

export function useReveal() {
  const ui = useUiStore()
  let observer

  function observe() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = document.querySelectorAll('.reveal')
    if (reduce) {
      nodes.forEach((node) => node.classList.add('is-in'))
      return
    }
    observer?.disconnect()
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
  }

  onMounted(() => {
    watch(
      () => ui.loaded,
      (loaded) => {
        if (loaded) window.setTimeout(observe, 180)
      },
      { immediate: true },
    )
  })

  onUnmounted(() => observer?.disconnect())
}
