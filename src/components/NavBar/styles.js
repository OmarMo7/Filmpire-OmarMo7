import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    display: "flex",
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      flexWrap: 'wrap'
    }
  },
  menuButton: {
    outline: 'none',
    color: "#fff",
    [theme.breakpoints.up('sm')]: {
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      // width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      // width: drawerWidth
    },
    linkButton: {
      '&:hover': {
        textDecoration: 'none'
      },
      color: theme.palette.text.primary
    }
  }

}))