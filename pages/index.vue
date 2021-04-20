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
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Vote Count</th>
        <th>Vote Average</th>
        <th>Popularity</th>
        <th>Overview</th>
        <th>Favorite</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie.id">
        <td>{{ movie.title }}</td>
        <td>{{ movie.vote_count }}</td>
        <td>{{ movie.vote_average }}</td>
        <td>{{ movie.popularity }}</td>
        <td>{{ movie.overview }}</td>
        <td>Favorite</td>
        <td>Delete</td>
      </tr>
    </tbody>
  </table>
</template>
