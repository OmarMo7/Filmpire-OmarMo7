import React from 'react'
import { CssBaseline } from '@mui/material'
import { Route, Switch } from 'react-router-dom'
import { Actors, MovieInfo, Movies, NavBar, Profile } from './'
const App = () => {

  return (
    <div>
      <CssBaseline />
      <NavBar />
      <main>
        <Switch>
          <Route exact path={'/'}>
            <Movies />
          </Route>
          <Route exact path={'/movies/:id'}>
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
    </div>
  )
}

export default App