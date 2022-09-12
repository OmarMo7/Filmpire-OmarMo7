import React, { useEffect } from 'react'
import { Typography, Button, Box } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useGetListQuery } from '../../services/TMDB'
import { RatedCards } from '..'
const Profile = () => {

  const { user } = useSelector((state) => state.user)
  const session_id = localStorage.getItem('session_id')

  const { data: favoritedMovies, refetch: refetchFavorited } = useGetListQuery({
    listName: '/favorite/movies',
    accountId: user.id,
    sessionId: session_id,
    page: 1
  })
  const { data: watchListedMovies, refetch: refetchWatchListed } = useGetListQuery({
    listName: '/watchlist/movies',
    accountId: user.id,
    sessionId: session_id,
    page: 1
  })

  useEffect(() => {
    refetchFavorited()
    refetchWatchListed()

  })


  const logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <Box>
      <Box display="flex" justifyContent={"space-between"}>
        <Typography variant="h4">
          Hello, {user.username}
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {
        !favoritedMovies?.results?.length && !watchListedMovies?.results?.length ? (
          <Typography variant='h5'>Add favorites to see them here!</Typography>
        ) :
          (
            <Box>
              <RatedCards title={"Favorite Movies"} data={favoritedMovies} />
              <RatedCards title={"WatchList Movies"} data={watchListedMovies} />
            </Box>
          )}
    </Box>
  )
}

export default Profile