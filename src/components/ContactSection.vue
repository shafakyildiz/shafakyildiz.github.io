<script setup>
import { useUiStore } from '@/stores/ui'
import { usePortfolioStore } from '@/stores/portfolio'

const ui = useUiStore()
const portfolio = usePortfolioStore()
</script>

<template>
  <section id="contact" class="contact">
    <div>
      <p class="kicker reveal">07 — Enquire</p>
      <h2 class="reveal" style="--d: 0.08s">Start a conversation.</h2>
      <a class="contact-mail reveal" :href="`mailto:${portfolio.profile.email}`">{{ portfolio.profile.email }}</a>
      <ul class="contact-meta reveal" style="--d: 0.12s">
        <li><a :href="portfolio.profile.phoneHref">{{ portfolio.profile.phone }}</a></li>
        <li>{{ portfolio.profile.location }}</li>
        <li>{{ portfolio.profile.coordinates }}</li>
      </ul>
      <p class="contact-social reveal" style="--d: 0.16s">
        <a
          v-for="link in portfolio.socials"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
        >{{ link.label }}</a>
      </p>
    </div>

    <form class="reveal" style="--d: 0.1s" @submit.prevent="ui.submitEnquiry()">
      <p v-if="ui.enquiry.status === 'sent'" class="form-sent">
        Your mail app should open with this note. If it does not, write to
        <a :href="`mailto:${portfolio.profile.email}`">{{ portfolio.profile.email }}</a>.
      </p>
      <template v-else>
        <label class="field">
          <span>Name</span>
          <input v-model="ui.enquiry.name" name="name" autocomplete="name" required />
        </label>
        <label class="field">
          <span>Email</span>
          <input v-model="ui.enquiry.email" name="email" type="email" autocomplete="email" required />
        </label>
        <label class="field">
          <span>Subject</span>
          <input v-model="ui.enquiry.subject" name="subject" autocomplete="off" />
        </label>
        <label class="field">
          <span>Message</span>
          <textarea v-model="ui.enquiry.message" name="message" rows="4" required></textarea>
        </label>
        <p v-if="ui.enquiry.error" class="form-error">{{ ui.enquiry.error }}</p>
        <button class="btn" type="submit">Send</button>
      </template>
    </form>
  </section>
</template>
