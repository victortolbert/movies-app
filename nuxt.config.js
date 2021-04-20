export default {
  target: 'static',
  components: true,
  axios: {
    baseURL: 'https://api.themoviedb.org/3',
  },
  publicRuntimeConfig: {
    tmdbApiKey: process.env.TMDB_API_KEY
  },
  modules: ['@nuxtjs/axios'],
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    jit: true
  },
   generate: {
    fallback: true
  }
}
