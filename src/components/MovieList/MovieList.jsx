import React from 'react'
import { CircularProgress, Grid, Typography, Box } from '@mui/material'

import useStyles from './styles'
import { Movie } from '..'
import { useGetMoviesQuery } from '../../services/TMDB'

const MovieList = ({ movies }) => {
  const classes = useStyles()
  const { data, error, isFetching } = useGetMoviesQuery()

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={"4rem"} />
      </Box>
    )
  }

  if (!data.results.length) {
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
    <Grid container className={classes.moviesContainer}>
      {movies?.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  )
}

export default MovieList