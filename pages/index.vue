<script>
export default {
  async asyncData({ $axios, $config: { tmdbApiKey } }) {
    const response = await $axios.$get(`/movie/top_rated?api_key=${tmdbApiKey}`)
    return {
      movies: response.results,
    }
  },
  data() {
    return {
      sorting: -1,
      currentSort: 'name',
      currentSortDir: 'asc',
      pageSize: 3,
      currentPage: 1
    }
  },
  methods: {
    sort(s) {
      // if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
    toggleSort(field) {
      console.log('field', field)
    },
    nextPage: function() {
      if ((this.currentPage * this.pageSize) < this.cats.length) this.currentPage++;
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
    }
  },
  computed: {
    // sortedMovies(field) {
    //   // return this.movies.sort((m1, m2) => m1[field] = m2[field])
    //   return this.movies.slice(0).sort((a, b) => a.title < b.title ? this.sorting : -this.sorting)
    // },

    // sortedMovies() {
    //   return this.movies.sort((a, b) => {
    //     let modifier = 1;
    //     if (this.currentSortDir === 'desc') modifier = -1;
    //     if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
    //     if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
    //     return 0;
    //   });
    // },

    sortedMovies() {
      return this.movies.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    },

    sortedItems() {
      if (this.enableSort) {
        return this.items.slice(0).sort((a, b) => a.name < b.name ? this.sorting : -this.sorting)
      } else {
        return this.items
      }
    },


    sortedArray() {
      let sortedMovies = this.recipes;

      sortedMovies = sortedMovies.sort((a, b) => {
        let fa = a.title.toLowerCase(), fb = b.title.toLowerCase();
        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }
        return 0
      })
    }
  }
}
</script>

<template>
  <main class="p-16 text-sm">
    <button @click="prevPage">Previous</button>
    <button @click="nextPage">Next</button>
    <table>
      <thead>
        <tr>
          <th class="py-2 px-4 text-left">
            <button type="button" @click="sortedMovies('title')">Title</button>
          </th>
          <th class="py-2 px-4 whitespace-nowrap">
            <button type="button" @click="sortedMovies('vote_count')">Vote Count</button>
          </th>
          <th class="py-2 px-4 whitespace-nowrap">
            <button type="button" @click="sortedMovies('vote_average')">Vote Average</button>
          </th>
          <th class="py-2 px-4">
            <button type="button" @click="sortedMovies('popularity')">Popularity</button>
          </th>
          <th class="py-2 px-4 text-left">Overview</th>
          <th class="py-2 px-4">Favorite</th>
          <th class="py-2 px-4">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in sortedMovies" :key="movie.id">
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
