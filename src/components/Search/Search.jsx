import React, { useState } from 'react'
import useStyles from './styles'
import {  TextField, InputAdornment } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { searchMovie } from '../../features/currentGenreOrCategory'

const Search = () => {
  const [query, setQuery] = useState('')
  const classes = useStyles()
  const dispatch = useDispatch()

  const location = useLocation()

  if (location.pathname !== '/') return null

  const onKey = (e) => {
    if (e.keyCode === 13) {
      dispatch(searchMovie(query))
    }
  }


  return (
    <div className={classes.searchContainer}>
      <TextField
        name='search'
        variant="standard"
        onKeyDown={onKey}
        value={query}
        onChange={(e) => { setQuery(e.target.value) }}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start" >
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      {/* <Button className={classes.searchButton} variant="contained" color="primary">Search</Button> */}
    </div>
  )
}

export default Search