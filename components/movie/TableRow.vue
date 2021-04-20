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
    <td class="align-top px-6 py-4 w-80">
      <div class="flex space-x-2">
        <img class="h-20" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" />
        <span>{{ movie.title }}</span>
      </div>
    </td>
    <td class="align-top px-6 py-4 text-center">{{ movie.vote_count }}</td>
    <td class="align-top px-6 py-4 text-center">{{ movie.vote_average }}</td>
    <td class="align-top px-6 py-4">{{ movie.overview }}</td>
    <td class="align-top px-6 py-4 text-center">{{ movie.popularity }}</td>
    <td class="align-top px-6 py-4">
      <div class="flex items-center space-x-4">
        <button @click="movie.isFavorite = !movie.isFavorite">
          <BaseIcon name="heart" :class="movie.isFavorite ? 'text-red-500' : 'text-gray-500'" />
        </button>
        <button>Delete</button>
      </div>
    </td>
  </tr>
</template>
