<script setup>
import { computed, watch } from 'vue'
import { useUiStore } from '@/stores/ui'
import { usePortfolioStore } from '@/stores/portfolio'
import { useReveal } from '@/composables/useReveal'
import { useActiveSection } from '@/composables/useActiveSection'
import SiteLoader from '@/components/SiteLoader.vue'
import SiteNav from '@/components/SiteNav.vue'
import SiteMenu from '@/components/SiteMenu.vue'
import HeroSection from '@/components/HeroSection.vue'
import LedeSection from '@/components/LedeSection.vue'
import WorkSection from '@/components/WorkSection.vue'
import NoteSection from '@/components/NoteSection.vue'
import PracticeSection from '@/components/PracticeSection.vue'
import JourneySection from '@/components/JourneySection.vue'
import ProcessSection from '@/components/ProcessSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const ui = useUiStore()
const portfolio = usePortfolioStore()
useReveal()
useActiveSection()

const current = computed(
  () => portfolio.navigation.find((item) => item.id === ui.activeSection) ?? portfolio.navigation[0],
)
const railLight = computed(() => ui.activeSection === 'home' || ui.activeSection === 'journey')

watch(
  () => ui.loaded,
  (loaded) => {
    if (loaded) document.body.classList.add('is-ready')
  },
  { immediate: true },
)
</script>

<template>
  <a class="skip" href="#craft">Skip to content</a>
  <SiteLoader />
  <SiteNav />
  <SiteMenu />
  <p class="rail" :class="{ 'is-light': railLight, 'is-off': ui.menuOpen }">
    <span>{{ current.index }}</span>
    <span>{{ current.label }}</span>
  </p>
  <main>
    <HeroSection />
    <LedeSection />
    <WorkSection />
    <NoteSection />
    <PracticeSection />
    <JourneySection />
    <ProcessSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
