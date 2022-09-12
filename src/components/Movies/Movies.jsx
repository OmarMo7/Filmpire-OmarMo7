import React, { useState } from 'react'
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useGetMoviesQuery } from '../../services/TMDB'
import { MovieList, Pagination } from '..'
import { FeaturedMovie } from '..'

const Movies = () => {
  const [page, setPage] = useState(1)
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory)
  const { data, error, isFetching } = useGetMoviesQuery({ page, genreIdOrCategoryName, searchQuery })
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'))

  const filterMovies = (data) => {
    return { ...data, results: data.results.filter((res, index) => index !== 0) }
  }

  const numberOfMovies = lg ? 16 : 18

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={"4rem"} />
      </Box>
    )
  }

  if (!data?.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies with such a name
          <br />
          Please search for something else
        </Typography>
      </Box>
    )
  }

  if (error) {
    return 'An error has occured'
  }


  return (
    <div>
      <FeaturedMovie movie={data?.results[0]} />
      <MovieList movies={filterMovies(data)} numberOfMovies={numberOfMovies} />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  )
}

export default Movies