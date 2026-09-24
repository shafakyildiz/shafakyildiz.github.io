<script setup>
import { watch } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useReveal } from '@/composables/useReveal'
import { useActiveSection } from '@/composables/useActiveSection'
import SiteLoader from '@/components/SiteLoader.vue'
import SiteNav from '@/components/SiteNav.vue'
import SiteMenu from '@/components/SiteMenu.vue'
import HeroSection from '@/components/HeroSection.vue'
import WorkSection from '@/components/WorkSection.vue'
import LedeSection from '@/components/LedeSection.vue'
import JourneySection from '@/components/JourneySection.vue'
import ContactSection from '@/components/ContactSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const ui = useUiStore()
useReveal()
useActiveSection()

watch(
  () => ui.loaded,
  (loaded) => {
    if (loaded) document.body.classList.add('is-ready')
  },
  { immediate: true },
)
</script>

<template>
  <a class="skip" href="#work">Skip to content</a>
  <SiteLoader />
  <SiteNav />
  <SiteMenu />
  <main>
    <HeroSection />
    <WorkSection />
    <LedeSection />
    <JourneySection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
