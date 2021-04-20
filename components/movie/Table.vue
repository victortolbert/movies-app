<script>
export default {
  data() {
    return {
      pageNumber: 0,
      search: '',
      sortableHeaders: [
        'vote_count',
        'vote_average',
        'popularity',
        'overview',
      ],
      currentSortDir: 'asc',
      currentSortCol: 'id'
    }
  },
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  methods: {
    viewMovieDetails(movie) {
      this.$router.push(`/movies/${movie.id}`)
    },
    resetPage() {
      this.pageNumber = 0
    },
    nextPage() {
      this.pageNumber++
    },
    prevPage() {
      this.pageNumber--
    },
    sort(col) {
      this.pageNumber = 0

      if (this.currentSortCol === col) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      } else {
        this.currentSortCol = col
      }
      this.movies.sort(this.sortBy(col, this.currentSortDir))
    },
    sortBy(property, order) {
      this.currentSortDir = order
      return function(a, b) {
        const varA =
          typeof a[property] === 'string'
            ? a[property].toUpperCase()
            : a[property]
        const varB =
          typeof b[property] === 'string'
            ? b[property].toUpperCase()
            : b[property]

        let comparison = 0
        if (varA > varB) comparison = 1
        else if (varA < varB) comparison = -1
        return order === 'desc' ? comparison * -1 : comparison
      }
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.filteredMovies.length / 10)
    },
    paginatedMovies() {
      const start = this.pageNumber * 10
      const end = start + 10
      return this.filteredMovies.slice(start, end)
    },
    filteredMovies() {
      return this.movies.filter(movie => {
        if (
          movie['title'].toLowerCase().indexOf(this.search.toLowerCase()) >
          -1 ||
          movie['overview'].toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
        )
          return movie
      })
    }
  }
}
</script>


<template>
  <div>
    <div>
      <input @keydown="resetPage" type="search" class placeholder="Search..." v-model="search" />
    </div>

    <div class="flex flex-col mt-4">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    @click="sort('title')"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Title</span>
                      <span v-if="'title' === currentSortCol">
                        <BaseIcon
                          :name="currentSortDir === 'asc' ? 'sort-ascending' : 'sort-descending'"
                        />
                      </span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                    @click="sort('vote_count')"
                  >
                    <div class="flex items-center space-x-1 whitespace-nowrap">
                      <span>Vote Count</span>
                      <span v-if="'vote_count' === currentSortCol">
                        <BaseIcon
                          :name="currentSortDir === 'asc' ? 'sort-ascending' : 'sort-descending'"
                        />
                      </span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase whitespace-nowrap"
                    @click="sort('vote_average')"
                  >
                    <div class="flex items-center w-full space-x-1 whitespace-nowrap">
                      <span>Vote Average</span>
                      <span v-if="'vote_average' === currentSortCol">
                        <BaseIcon
                          :name="currentSortDir === 'asc' ? 'sort-ascending' : 'sort-descending'"
                        />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    @click="sort('overview')"
                  >
                    <div class="flex items-center w-full space-x-1 whitespace-nowrap">
                      <span>Overview</span>
                      <span v-if="'overview' === currentSortCol">
                        <BaseIcon
                          :name="currentSortDir === 'asc' ? 'sort-ascending' : 'sort-descending'"
                        />
                      </span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    @click="sort('popularity')"
                  >Popularity</th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    @click="sort('vote_average')"
                  ></th>
                </tr>
              </thead>
              <tbody>
                <MovieTableRow :movie="movie" v-for="movie in paginatedMovies" :key="movie.id" />

                <tr v-if="paginatedMovies.length === 0">
                  <td colspan="4">
                    <div class="alert alert-warning">
                      <strong>No movies found</strong>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <div>
                  <button
                    class="btn-sm btn-dark"
                    :disabled="pageNumber === 0"
                    :style="pageNumber === 0 ? { opacity: 0.5 } : ''"
                    @click="prevPage"
                  >Prev</button>

                  <span style="font-weight:bold">{{ pageNumber + 1 }}/{{ pageCount }}</span>

                  <button
                    class="btn-sm btn-dark"
                    :disabled="pageNumber + 1 === pageCount"
                    :style="pageNumber + 1 === pageCount ? { opacity: 0.5 } : ''"
                    @click="nextPage"
                  >Next</button>
                </div>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
th {
  cursor: pointer;
}
</style>
