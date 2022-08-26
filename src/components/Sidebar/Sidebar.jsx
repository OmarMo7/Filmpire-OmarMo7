import React, { useEffect } from 'react'
import { Divider, List, ListItem, ListSubheader, ListItemIcon, ListItemButton, Box, CircularProgress, ListItemText, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useStyles from './styles'
import { useGetGenresQuery } from '../../services/TMDB'
import genreIcons from '../../assets/assets/genres'
import { useDispatch, } from 'react-redux'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import redLogo from '../../images/OCINEMA_red.png'
import blueLogo from '../../images/OCINEMA_blue.png'

const Sidebar = () => {

  const { data, isFetching } = useGetGenresQuery()
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useDispatch()
  const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' }

  ]

  console.log(theme.palette.mode)

  return (
    <>
      <Link to='/' className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="OCINEMA"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>
          Categories
        </ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton>
              <ListItem sx={{ paddingTop: "0px", paddingBottom: "0px" }}
                onClick={() => { dispatch(selectGenreOrCategory(value)) }}>
                <ListItemIcon color={theme.palette.text.primary}>
                  <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30} />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>
          Genres
        </ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size={"4rem"} />
          </Box>
        ) :
          data.genres.map(({ name, id }) => (
            <Link key={id} className={classes.links} to="/">
              <ListItemButton>
                <ListItem sx={{ paddingTop: "0px", paddingBottom: "0px" }}
                  onClick={() => { dispatch(selectGenreOrCategory(id)) }}>
                  <ListItemIcon color={theme.palette.text.primary}>
                    <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              </ListItemButton>
            </Link>
          ))}
      </List>
    </>
  )
}

export default Sidebar