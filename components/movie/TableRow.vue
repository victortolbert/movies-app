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
    <td>{{ movie.title }}</td>
    <td>{{ movie.vote_count }}</td>
    <td>{{ movie.vote_average }}</td>
    <td>{{ movie.overview }}</td>
    <td>{{ movie.popularity }}</td>
    <td>
      <button>{{ movie.isFavorite }}</button>
      <button>Delete</button>
    </td>
  </tr>
</template>
