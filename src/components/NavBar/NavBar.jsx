import React, { useEffect, useState } from 'react'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material'
import { Menu, AccountCircle, Brightness7, Brightness4 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useClasses from './styles'
import { Sidebar, Search } from ".."
import { createSessionId, fetchToken, moviesApi } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../features/auth'
const NavBar = () => {

  const classes = useClasses()
  const { isAuth, user } = useSelector((state) => state.user)
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:600px)')
  const token = localStorage.getItem('request_token')
  const session_id_from_LS = localStorage.getItem('session_id')
  const dispatch = useDispatch()

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (session_id_from_LS) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${session_id_from_LS}`)
          dispatch(setUser(userData))
        }
        else {
          const session_id = await createSessionId()
          const { data: userData } = await moviesApi.get(`/account?session_id=${session_id}`)
          dispatch(setUser(userData))
        }
      }
    }

    logInUser()
  }, [token])

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (<IconButton
            color="secondary"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => { setMobileOpen((prevMobileOpen) => !prevMobileOpen) }}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          )}
          <IconButton
            color="secondary"
            sx={{ ml: 1 }}
            onClick={() => { }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && (<Search />)}
          <div>
            {!isAuth ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                color={"inherit"}
                onClick={() => { }}
              >
                <div color={"inherit"}>My Movies &nbsp; </div>
                <Avatar
                  style={{ width: '40px', height: '40px' }}
                  alt="profile"
                  src={"https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ?
            (
              <Drawer
                variant='temporary'
                anchor='left'
                open={mobileOpen}
                onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                classes={{ paper: classes.drawerPaper }}
                ModalProps={{ keepMounted: true }}
              >
                <Sidebar
                  setMobileOpen={setMobileOpen}
                />
              </Drawer>
            ) :
            (
              <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
                <Sidebar
                  setMobileOpen={setMobileOpen}
                />
              </Drawer>
            )}
        </nav>
      </div>
    </>
  )
}

export default NavBar