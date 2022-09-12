import makeStyles from "@mui/styles/makeStyles";


export default makeStyles((theme) => ({
  movie: {
    padding: '10px'
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '180px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '10px',
    marginBottom: 0,
    textAlign: 'center',
    fontSize: '0.95rem',

  },
  links: {
    alignItems: "center",
    fontWeight: "bold",
    textDecoration: 'none',
    [theme.breakpoints.up('xs')]: {
      display: "flex",
      flexDirection: 'column'
    },
    "&:hover": {
      cursor: 'pointer',
    }
  },
  image: {
    borderRadius: '20px',
    height: '230px',
    marginBottom: '25px',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  }
}))