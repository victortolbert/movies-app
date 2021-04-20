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

    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <!-- <th v-for="(header, index) in sortableHeaders" :key="index" @click="sort(header)">
              {{ header }}
              <span v-if="header === currentSortCol">
                <BaseIcon
                  :name="[currentSortDir === 'asc' ? 'sort-ascending' : 'sort-descending']"
                />
              </span>
                  </th>-->
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    @click="sort('vote_count')"
                  >
                    <div class="flex items-center whitespace-nowrap space-x-1">
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
                    class="px-6 py-3 whitespace-nowrap text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    @click="sort('vote_average')"
                  >
                    <div class="flex items-center space-x-1 whitespace-nowrap">
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
                    class="px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    @click="sort('overview')"
                  >Overview</th>
                  <th
                    scope="col"
                    class="px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    @click="sort('popularity')"
                  >Popularity</th>
                  <th
                    scope="col"
                    class="px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
