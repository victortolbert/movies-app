<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => { }
    },
  },
}
</script>

<template>
  <tr>
    <td>
      <button class="btn-primary btn-sm" @click="viewMovieDetails(movie)">{{ movie.title }}</button>
    </td>
    <td>{{ movie.vote_count }} / {{ movie.vote_average }}</td>
    <td>{{ movie.title }}</td>
    <td>{{ movie.overview }}</td>
    <td>{{ movie.popularity }}</td>
  </tr>
</template>
