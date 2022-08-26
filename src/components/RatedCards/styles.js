import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'initial',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  }

}))