import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY
console.log(tmdbApiKey)
//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //Get Movies by Type
    getGenres: builder.query({
      query: () => `genre/movie/list?&api_key=${tmdbApiKey}`
    }),
    //Get Movies by Type
    getMovies: builder.query({
      query: ({ page, genreIdOrCategoryName, searchQuery }) => {
        //* Get Movies By Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
        }

        //* Get Movies By Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
        }

        //* Get Movies By Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
        }

        //* Get Popular Movies By default
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`
      }
    }),
    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
    }),
    getRecommendations: builder.query({
      query: ({ movie_id, list }) => `movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
    }),
    getActor: builder.query({
      query: (actor_id) => `person/${actor_id}?api_key=${tmdbApiKey}`
    }),
    getMoviesByActorRec: builder.query({
      query: ({ actor_id, page }) => `discover/movie?with_cast=${actor_id}&page=${page}&api_key=${tmdbApiKey}`
    }),
  })
})

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorRecQuery
} = tmdbApi