import { onMounted, onUnmounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import { usePortfolioStore } from '@/stores/portfolio'

export function useActiveSection() {
  const ui = useUiStore()
  const portfolio = usePortfolioStore()
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) ui.setSection(visible.target.id)
      },
      { threshold: [0.25, 0.45], rootMargin: '-18% 0px -40% 0px' },
    )
    portfolio.navigation.forEach((item) => {
      const node = document.getElementById(item.id)
      if (node) observer.observe(node)
    })
  })

  onUnmounted(() => observer?.disconnect())
}
