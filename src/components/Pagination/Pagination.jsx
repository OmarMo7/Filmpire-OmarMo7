import { Typography, Button } from '@mui/material'
import React from 'react'
import useStyles from './styles'

const Pagination = ({ currentPage, setPage, totalPages }) => {


  const classes = useStyles()
  if (totalPages === 0) return null;

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  return (
    <div className={classes.container}>
      <Button color="primary" onClick={handlePrev} type="button" className={classes.button} variant="contained">
        Prev
      </Button>
      <Typography variant='h4' className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button color="primary" onClick={handleNext} type="button" className={classes.button} variant="contained">
        Next
      </Button>
    </div>
  )
}

export default Pagination