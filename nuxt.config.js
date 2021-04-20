export default {
  target: 'static',
  ssr: false,
  components: true,
  axios: {
    baseURL: 'https://api.themoviedb.org/3',
  },
  publicRuntimeConfig: {
    tmdbApiKey: process.env.TMDB_API_KEY,
  },
  modules: ['@nuxtjs/axios'],
  buildModules: ['@nuxtjs/composition-api/module', '@nuxtjs/tailwindcss'],
  plugins: ['~/plugins/portal-vue', '~/plugins/vue-content-placeholders'],
  tailwindcss: {
    jit: true,
  },
  generate: {
    fallback: true,
  },
}
