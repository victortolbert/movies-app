<script>
export default {
  async asyncData({ $axios, $config: { tmdbApiKey } }) {
    const response = await $axios.$get(`/movie/top_rated?api_key=${tmdbApiKey}&language=en-US&page=1`)
    return {
      movies: response.results,
    }
  }
}
</script>

<template>
  <main class="p-16 text-sm">
    <table>
      <thead>
        <tr>
          <th class="py-2 px-4 text-left">Title</th>
          <th class="py-2 px-4 whitespace-nowrap">Vote Count</th>
          <th class="py-2 px-4 whitespace-nowrap">Vote Average</th>
          <th class="py-2 px-4">Popularity</th>
          <th class="py-2 px-4 text-left">Overview</th>
          <th class="py-2 px-4">Favorite</th>
          <th class="py-2 px-4">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td class="align-top py-2 px-4 whitespace-nowrap">{{ movie.title }}</td>
          <td class="align-top py-2 px-4 text-center">{{ movie.vote_count }}</td>
          <td class="align-top py-2 px-4 text-center">{{ movie.vote_average }}</td>
          <td class="align-top py-2 px-4">{{ movie.popularity }}</td>
          <td class="align-top py-2 px-4">{{ movie.overview }}</td>
          <td class="align-top py-2 px-4">Favorite</td>
          <td class="align-top py-2 px-4">Delete</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
