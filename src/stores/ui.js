import { defineStore } from 'pinia'
import { usePortfolioStore } from './portfolio'

export const useUiStore = defineStore('ui', {
  state: () => ({
    theme: localStorage.getItem('sy-theme') === 'dark' ? 'dark' : 'light',
    menuOpen: false,
    loaded: sessionStorage.getItem('sy-loaded') === '1',
    activeSection: 'home',
    enquiry: {
      name: '',
      email: '',
      subject: '',
      message: '',
      status: 'idle',
      error: '',
    },
  }),
  actions: {
    openMenu() {
      this.menuOpen = true
    },
    closeMenu() {
      this.menuOpen = false
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    applyTheme() {
      document.documentElement.dataset.theme = this.theme
      localStorage.setItem('sy-theme', this.theme)
      document.querySelector('meta[name="theme-color"]')?.setAttribute(
        'content',
        this.theme === 'dark' ? '#12141a' : '#fff9f1',
      )
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      this.applyTheme()
    },
    finishLoad() {
      this.loaded = true
      document.body.classList.add('is-ready')
      sessionStorage.setItem('sy-loaded', '1')
    },
    setSection(id) {
      this.activeSection = id
    },
    goTo(id) {
      this.menuOpen = false
      document.body.classList.remove('is-locked')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    submitEnquiry() {
      const { name, email, subject, message } = this.enquiry
      if (!name.trim() || !email.trim() || !message.trim()) {
        this.enquiry.error = 'Name, email, and a message are required.'
        this.enquiry.status = 'idle'
        return
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        this.enquiry.error = 'Enter a valid email address.'
        this.enquiry.status = 'idle'
        return
      }
      const portfolio = usePortfolioStore()
      const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()}\n${email.trim()}`)
      const title = encodeURIComponent(subject.trim() || 'Enquiry')
      window.location.href = `mailto:${portfolio.profile.email}?subject=${title}&body=${body}`
      this.enquiry.error = ''
      this.enquiry.status = 'sent'
    },
  },
})
