import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/main.css'

if (sessionStorage.getItem('sy-loaded') === '1') {
  document.body.classList.add('is-ready')
}

if (localStorage.getItem('sy-theme') === 'dark') {
  document.documentElement.dataset.theme = 'dark'
}

createApp(App).use(createPinia()).mount('#app')
