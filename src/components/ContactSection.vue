<script setup>
import { useUiStore } from '@/stores/ui'
import { usePortfolioStore } from '@/stores/portfolio'

const ui = useUiStore()
const portfolio = usePortfolioStore()
</script>

<template>
  <section id="contact" class="contact">
    <div>
      <h2 class="reveal">Let’s build the next one.</h2>
      <a class="contact-mail" :href="`mailto:${portfolio.profile.email}`">{{ portfolio.profile.email }}</a>
      <p>{{ portfolio.profile.phone }} · {{ portfolio.profile.location }}</p>
      <p class="contact-social">
        <a v-for="link in portfolio.socials" :key="link.label" :href="link.href" target="_blank" rel="noreferrer">{{ link.label }}</a>
      </p>
    </div>
    <form @submit.prevent="ui.submitEnquiry()">
      <p v-if="ui.enquiry.status === 'sent'" class="form-sent">
        Your mail app should open with this note. If it does not, write to
        <a :href="`mailto:${portfolio.profile.email}`">{{ portfolio.profile.email }}</a>.
      </p>
      <template v-else>
        <label class="field"><span>Name</span><input v-model="ui.enquiry.name" name="name" autocomplete="name" required /></label>
        <label class="field"><span>Email</span><input v-model="ui.enquiry.email" name="email" type="email" autocomplete="email" required /></label>
        <label class="field"><span>Message</span><textarea v-model="ui.enquiry.message" name="message" rows="4" required></textarea></label>
        <p v-if="ui.enquiry.error" class="form-error">{{ ui.enquiry.error }}</p>
        <button class="btn" type="submit">Send</button>
      </template>
    </form>
  </section>
</template>
