export const state = () => ({
  movies: [],
})

export const mutations = {
  SET_MOVIES: (state, movies) =>
    (state.movies = movies.map(movie => {
      return {
        ...movie,
        isFavorite: false
      }
    })),
}

export const actions = {
  async nuxtServerInit({ commit }, { $axios, $config: { tmdbApiKey} }) {
    const { results: movies } = await $axios.$get(`/movie/top_rated?api_key=${tmdbApiKey}`)

    commit('SET_MOVIES', movies)
  }
}
