import React, { useEffect } from 'react'
import { Divider, List, ListItem, ListSubheader, ListItemIcon, ListItemButton, Box, CircularProgress, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useStyles from './styles'

const Sidebar = ({ setMobileOpen }) => {

  const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
  const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';
  const theme = useTheme()
  const classes = useStyles()
  const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' }

  ]

  const demoCategories = [{ label: 'Comedy', value: 'Comedy' },
  { label: 'Horror', value: 'Horror' },
  { label: 'Action', value: 'action' },
  { label: 'Animation', value: 'animation' },
  { label: 'Action', value: 'romance' },
  ]


  return (
    <>
      <Link to='/' className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="Filmpire"
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
              <ListItem sx={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={() => { }}>
                {/* <ListItemIcon>
                  <img src={blueLogo} className={classes.genreImage} height={30} />
                </ListItemIcon> */}
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
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton>
              <ListItem sx={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={() => { }}>
                {/* <ListItemIcon>
                  <img src={blueLogo} className={classes.genreImage} height={30} />
                </ListItemIcon> */}
                <ListItemText primary={label} />
              </ListItem>
            </ListItemButton>
          </Link>
        ))}
      </List>
    </>
  )
}

export default Sidebar