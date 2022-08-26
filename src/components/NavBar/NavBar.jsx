import React, { useEffect, useState, useContext } from 'react'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material'
import { Menu, AccountCircle, Brightness7, Brightness4 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useClasses from './styles'
import { Sidebar, Search } from ".."
import { createSessionId, fetchToken, moviesApi } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../features/auth'
import { ColorModeContext } from '../utils/ToggleColorsMode'
import flipIcons from './flipIcons'

const drawerWidth = 240

const NavBar = ({ mobileOpen, setMobileOpen }) => {

  const colorMode = useContext(ColorModeContext)
  const classes = useClasses()
  const { isAuth, user } = useSelector((state) => state.user)
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width:600px)')
  const token = localStorage.getItem('request_token')
  const session_id_from_LS = localStorage.getItem('session_id')
  const dispatch = useDispatch()

  useEffect(() => {
    const logInUser = async () => {
      try {
        if (token) {
          if (session_id_from_LS) {
            const { data: userData } = await moviesApi.get(`/account?session_id=${session_id_from_LS}`)
            dispatch(setUser(userData))
          }
          else {
            const session_id = await createSessionId()
            console.log(session_id)
            const { data: userData } = await moviesApi.get(`/account?session_id=${session_id}`)
            dispatch(setUser(userData))
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    logInUser()
  }, [token])

  const propsOnOpen = {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
  const propsOnClose = {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  }

  flipIcons(theme)

  return (
    <>
      <AppBar position="fixed" style={mobileOpen ? propsOnOpen : propsOnClose}>
        <Toolbar className={classes.toolbar}>
          <div style={{ justifyContent: 'initial' }}>
            <IconButton
              color="inherit"
              edge="start"
              style={{ marginLeft: '10px' }}
              onClick={() => { setMobileOpen((prevMobileOpen) => !prevMobileOpen) }}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </div>
          {!isMobile && (<Search />
          )}
          {((isMobile && !mobileOpen) || !isMobile) && (
            <div>
              {!isAuth ? (
                <Button color="inherit" onClick={() => {
                  fetchToken()
                }}>
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
          )}
          {isMobile && (<Search />)}
        </Toolbar>
      </AppBar>
      <div>
        <nav>

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
              <Drawer classes={{ paper: classes.drawerPaper }}
                variant='persistent'
                anchor='left'
                open={mobileOpen}
                onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              >
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