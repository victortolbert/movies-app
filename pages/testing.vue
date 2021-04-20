<template>
  <div>
    <template v-if="$fetchState.pending">
      <PendingPlaceholder />
    </template>

    <template v-else-if="$fetchState.error">
      <p>Error while fetching movies: {{ $fetchState.error.movie }}</p>
    </template>

    <template v-else>
      <MovieTable :movies="movies" />
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useMovies from '~/composables/useMovies'

export default defineComponent({
  setup(props, context) {
    const { movies, formatDate, filteredMovies, } = useMovies()
    return { movies, formatDate, filteredMovies, }
  },
})
</script>
