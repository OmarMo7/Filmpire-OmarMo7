import React, { useState } from 'react'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material'
import { Menu, AccountCircle, Brightness7, Brightness4 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useClasses from './styles'
import Sidebar from "../Sidebar/Sidebar"
const NavBar = () => {

  const classes = useClasses()
  const theme = useTheme()
  const isAuth = false
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:600px)')
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
          {!isMobile && (<div>Search ... </div>)}
          <div>
            {!isAuth ? (
              <Button color="inherit" onClick={() => { }}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                component={Link}
                to={`/profile/:id`}
                className={classes.linkButton}
                onClick={() => { }}
              >
                {!isMobile && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: '30px', hegith: '30px' }}
                  alt="profile"
                  src={"https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"}
                />
              </Button>
            )}
          </div>
          {isMobile && 'Search...'}
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