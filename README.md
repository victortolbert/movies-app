@victortolbert/movies-app

# Front-end Challenge Submission

- Vue
- https://developers.themoviedb.org/3/movies/get-top-rated-movies

## Local development instructions

1. Copy `.env.example` to `.env` and update the `TMDB_API_KEY` value
2. To install and run the dev server... `npm install && npm run dev`

- [ ] Create a Custom Table Component (MovieTable)
  * Title, Vote Count, Average Vote, Overview, Popularity, Poster
- [ ] Favorite
- [ ] Delete
- [ ] Allow for sorting of Strings and Number columns only
- [ ] Add a Delete button to the table for each row, that will delete that row of information and not display it again on both tables (single state) (unless the user refreshes the application)
- [ ] Add a checkmark for setting a Boolean for selecting the favorite movies
- [ ] The column for displaying the vote average should be editable (because the user wishes to have this power). Clicking on it will change the cell to an input that allows you to insert and change the vote_average for the movie
- [ ] Create a Second Table *(The Favorite Table)* showing the selected movies that have a checkmark in the first table,
- [ ] or have a vote_average of 7 or more
* shows the same data as the first except delete
- [ ] Add a checkmark here to remove them from this list, and correspondingly uncheck the checkmark in the Movie table
* [ ] This table is sorted by the vote average whenever the amount changes re-sort the Favorite Table
* [ ] If the vote_average is above a 7 then no matter what the movie is added to the Favorites list (overrides the checkmark to add them here)
