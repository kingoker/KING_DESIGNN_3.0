import { defineNuxtPlugin } from '#app'
import gsap from 'gsap'

export default defineNuxtPlugin((nuxtApp) => {
  // Делаем GSAP доступным в компонентах через this.$gsap или useNuxtApp().$gsap
  nuxtApp.provide('gsap', gsap)
})
