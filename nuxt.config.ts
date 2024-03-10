// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-bootstrap-icons", "vue3-carousel-nuxt", "@vueuse/nuxt"],
  css: ["~/assets/style.css", "bootstrap/dist/css/bootstrap.min.css"],
});
