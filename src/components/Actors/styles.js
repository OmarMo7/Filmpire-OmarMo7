import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({

  // containerSpaceAround: {
  //   display: 'flex',
  //   justifyContent: 'space-around',
  //   margin: '10px 0 !important',
  //   [theme.breakpoints.down('sm')]: {
  //     flexDirection: 'column',
  //     flexWrap: 'wrap'
  //   },
  // },
  actor_image: {
    borderRadius: '20px',
    boxShadow: '0.5em 1em 1em rgb(144, 144, 151)',
    width: '70%',
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '50%',
      height: '350px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
      height: '350px',
      marginBottom: '30px'
    },
  },

  details: {
    display: 'flex',
    justifyContent: 'center',
  }

}))