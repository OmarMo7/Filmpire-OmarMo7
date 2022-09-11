import React, { useState, useRef } from 'react'
import { CssBaseline } from '@mui/material'
import { Route, Switch } from 'react-router-dom'
import { Actors, MovieInfo, Movies, NavBar, Profile } from './'
import { useTheme } from '@mui/material/styles'
import useAlan from './AlanAi'

import useStyles from './styles'


const App = () => {

  useAlan()

  const alanBtnContainer = useRef()
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()

  const propsOnClose = {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `0px`,
  }

  const propsOnOpen = {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `240px`,
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className={classes.content} style={mobileOpen ? propsOnOpen : propsOnClose}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={'/'}>
            <Movies />
          </Route>
          <Route exact path={'/movie/:id'}>
            <MovieInfo />
          </Route>
          <Route exact path={'/actors/:id'}>
            <Actors />
          </Route>
          <Route exact path={'/profile/:id'}>
            <Profile />
          </Route>
        </Switch>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  )
}

export default App