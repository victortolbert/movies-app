<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => { }
    },
  },
  data() {
    return {
      showNewRating: false,
      newRating: null
    }
  }
}
</script>

<template>
  <tr>
    <td class="px-6 py-4 align-top">
      <button @click="movie.isFavorite = !movie.isFavorite">
        <BaseIcon name="heart" :class="movie.isFavorite ? 'text-red-500' : 'text-gray-500'" />
      </button>
    </td>
    <td class="px-6 py-4 align-top w-80">
      <div class="flex space-x-2">
        <img class="h-20" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" />
        <span>{{ movie.title }}</span>
      </div>
    </td>
    <td class="px-6 py-4 text-center align-top">{{ movie.vote_count }}</td>
    <td class="px-6 py-4 text-center align-top">
      <input
        v-if="showNewRating"
        @blur="showNewRating = false"
        type="text"
        class="text-center"
        placeholder="Enter new rating"
        v-model="newRating"
      />
      <button v-else @dblclick="showNewRating = !showNewRating">{{ movie.vote_average }}</button>
    </td>
    <td class="px-6 py-4 align-top">{{ movie.overview }}</td>
    <td class="px-6 py-4 text-center align-top">{{ movie.popularity }}</td>
    <td class="px-6 py-4 align-top">
      <div class="flex items-center space-x-4">
        <button>Delete</button>
      </div>
    </td>
  </tr>
</template>
