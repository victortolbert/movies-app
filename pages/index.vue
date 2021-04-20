<script>
export default {
  data() {
    return {
      movies: []
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(`/movie/top_rated?api_key=${this.$config.tmdbApiKey}`)
    this.movies = data.results.map(movie => {
      return {
        ...movie,
        isFavorite: false
      }
    })
  }
}
</script>

<template>
  <p v-if="$fetchState.pending">Fetching movies...</p>
  <p v-else-if="$fetchState.error">An error occurred</p>
  <div v-else>
    <MovieTable :movies="movies" />
  </div>
</template>
