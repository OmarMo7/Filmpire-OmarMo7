import React from 'react'
import { Typography, Box } from '@mui/material'
import useStyles from './styles'
import { Movie } from '..'

const RatedCards = ({ title, data }) => {
  const classes = useStyles()
  console.log(data?.results)

  return (
    <div>
      <Box>
        <Typography variant='h5' gutterBottom >
          {title}
        </Typography>
        {data?.results?.length !== 0 ? (
          <Box display="flex" flexWrap={"wrap"} className={classes.container}>
            {data?.results.map((movie, i) => (
              <Movie key={movie.id} movie={movie} i={i} />
            ))}
          </Box>

        ) :
          (
            <div style={{ marginLeft: '10px', marginBottom: "50px" }}>
              No movies to show
            </div>
          )
        }
      </Box>
    </div>
  )
}

export default RatedCards