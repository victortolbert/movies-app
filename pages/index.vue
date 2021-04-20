<script>
export default {
  async asyncData({ $axios, $config: { tmdbApiKey } }) {
    const response = await $axios.$get(`/movie/top_rated?api_key=${tmdbApiKey}&language=en-US&page=1`)
    return { response }
  }
}
</script>

<template>
  <pre>{{ response }}</pre>
</template>
