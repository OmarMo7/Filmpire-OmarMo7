import React, { useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useGetActorQuery, useGetMoviesByActorRecQuery } from '../../services/TMDB'
import { Movie as MovieIcon, ArrowBack } from '@mui/icons-material'
import { Typography, Button, Grid, Box, CircularProgress } from '@mui/material'
import useStyles from './styles'
import { MovieList, Pagination } from '..'

const Actors = () => {

  const { id: actor_id } = useParams()
  const [page, setPage] = useState(1)
  const { data, isFetching, error } = useGetActorQuery(actor_id)
  const { data: moviesByActor, isFetching: isFetchingMoviesByActor } = useGetMoviesByActorRecQuery({ actor_id, page })
  const classes = useStyles()
  const history = useHistory()


  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={"4rem"} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something has gone wrong - go back</Link>
      </Box>
    )
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img className={classes.actor_image} alt={data?.name} src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`} />
        </Grid>
        <Grid item lg={7} xl={8} className={classes.details} flexDirection='column'
        >
          <Typography variant={"h2"} gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant={"h5"} gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography align={"justify"} variant={"body2"} paragraph>
            {data?.biography || 'Sorry, no bio provided for this actor.'}
          </Typography>
          <Box marginTop={'2rem'} display="flex" justifyContent={"space-around"}>
            <Button target={"_blank"} variant="contained" color="primary" href={`https://www.imdb.com/name/${data?.imdb_id}`} endIcon={<MovieIcon />}>
              IMDB
            </Button>
            <Button onClick={() => { history.goBack() }} startIcon={<ArrowBack />} color="primary">
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h3" fontWeight={100} align="center" gutterBottom>
          Movies Starred
        </Typography>
        {isFetchingMoviesByActor ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size={"4rem"} />
          </Box>
        ) :
          (
            <>
              {moviesByActor && <MovieList movies={moviesByActor} numberOfMovies={12} />}
            </>)
        }
      </Box>

      <Pagination currentPage={page} setPage={setPage} totalPages={moviesByActor?.total_pages} />
    </>
  )
}

export default Actors