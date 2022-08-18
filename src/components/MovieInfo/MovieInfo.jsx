import React, { useState, useEffect } from 'react'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material'
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowLink, ArrowBack } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import genreIcons from '../../assets/assets/genres'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../../services/TMDB'
import useStyles from './styles'
import { MovieList } from '..'


const MovieInfo = () => {

  const { id } = useParams()
  const { user } = useSelector(state => state.user)
  const { data, isFetching, error } = useGetMovieQuery(id)
  const page = 1
  const session_id = localStorage.getItem('session_id')
  const classes = useStyles()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { data: recommendedData, isFetching: isFetchingRecommend } = useGetRecommendationsQuery({ movie_id: id, list: '/recommendations' })
  const isMobile = useMediaQuery('(max-width:600px)')
  const { data: favoritedMovies } = useGetListQuery({
    listName: '/favorite/movies',
    accountId: user.id,
    sessionId: session_id,
    page: page
  })
  const { data: watchListedMovies } = useGetListQuery({
    listName: '/watchlist/movies',
    accountId: user.id,
    sessionId: session_id,
    page: page
  })
  const [isFavorited, setIsFavorited] = useState(false)
  const [isWatchListed, setIsWatchListed] = useState(false)

  useEffect(() => {
    setIsFavorited(!!favoritedMovies?.results?.find((movie) => movie?.id === data?.id))

  }, [favoritedMovies, data])

  useEffect(() => {
    setIsWatchListed(!!watchListedMovies?.results?.find((movie) => movie?.id === data?.id))

  }, [watchListedMovies, data])


  const addToWatchList = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !isWatchListed
      })
    setIsWatchListed((prev) => !prev)
  }

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !isFavorited
      })
    setIsFavorited((prev) => !prev)
  }

  console.log(favoritedMovies)

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
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} >
        <img className={classes.poster} alt={data?.title} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} />
      </Grid>
      <Grid item container direction={"column"} lg={7}>
        <Typography align={"center"} variant={"h3"} gutterBottom>
          {data?.title} {(data.release_date.split('-')[0])}
        </Typography>
        <Typography align={"center"} variant={"h5"} gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display={"flex"} align="center">
            <Rating readOnly value={data?.vote_average / 2} precision={0.1} />
            <Typography variant={"subtitle1"} gutterBottom style={{ marginLeft: '10px' }}>
              {data?.vote_average.toString().slice(0, 3)} / 10
            </Typography>
          </Box>
          <Typography align={"center"} variant={"h6"} gutterBottom>
            {data?.runtime} min | Language: {data.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/" onClick={() => { dispatch(selectGenreOrCategory(id)) }}>
              <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color={"textPrimary"} variant="subtitle1" >
                {name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography variant="h6" gutterBottom style={{ marginBottom: '1rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom >
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data.credits.cast.map((char, i) => (
            char.profile_path && (
              <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${char.id}`}
                style={{ textDecoration: 'none' }}>
                <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${char.profile_path}`} alt={char.name} />
                <Typography color="textPrimary" >{char?.name}</Typography>
                <Typography color="textSecondary" >{char?.character.split('/')[0]}</Typography>
              </Grid>
            )
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div >
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size={!isMobile ? "medium" : "small"}>
                <Button target={"_blank"} href={data?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                <Button target={"_blank"} href={`www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                {data?.videos.results.length > 0 && (
                  <Button onClick={() => { setOpen(true) }} endIcon={<Theaters />}>
                    Trailer
                  </Button>
                )}
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size={!isMobile ? "medium" : "small"}>
                <Button onClick={addToFavorites}
                  endIcon={isFavorited ? <FavoriteBorderOutlined /> : <Favorite />} >
                  {!isFavorited ? 'Favorite' : 'Unfavorite'}
                </Button>
                <Button onClick={addToWatchList}
                  endIcon={isWatchListed ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button onClick={() => { }} sx={{ border: 'primary.main' }} endIcon={<ArrowBack />}>
                  <Typography component={Link} to='/' color="inherit" variant="subtitle2" style={{ textDecoration: 'none' }}>
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box style={{ marginTop: '5rem', width: '100%' }}>
        <Typography gutterBottom variant="h4">
          You might also like:
        </Typography>
        {
          recommendedData ?
            <MovieList movies={recommendedData} numberOfMovies={12} />
            :
            <Box>
              Sorry, nothing was found.
            </Box>
        }
      </Box>

      <Modal closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => { setOpen(false) }}
      >
        <iframe
          autoPlay
          className={classes.video}
          frameBorder={'0'}
          title={`${data?.title} Trailer`}
          src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
          allow="autoplay"
        />
      </Modal>
    </Grid>
  )
}

export default MovieInfo