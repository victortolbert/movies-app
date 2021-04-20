export const state = () => ({
  movies: [],
})

export const getters = {
  favoriteMovies: state => {
        return state.movies.filter(movie => movie.isFavorite)
  }
}

export const mutations = {
  SET_MOVIES: (state, movies) =>
    (state.movies = movies.map(movie => {
      return {
        ...movie,
        isFavorite: false
      }
    })),

    REMOVE_MESSAGE(state, messageId) {
        state.messages = state.messages.filter(message => message.id !== messageId)
    },
}

export const actions = {
  async nuxtServerInit({ commit }, { $axios, $config: { tmdbApiKey} }) {
    const { results: movies } = await $axios.$get(`/movie/top_rated?api_key=${tmdbApiKey}`)

    commit('SET_MOVIES', movies)
  }
}
