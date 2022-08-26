import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  image: {
    width: "70%",

  },
  imageLink: {
    display: "flex",
    width: '252px',
    height: '85px',
    justifyContent: "center",
    padding: "10% 0% 0% 0%",
    marginBottom: "20px"
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' ? 'invert(1)' : ''
  }

}))