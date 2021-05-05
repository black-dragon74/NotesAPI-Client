import { DrawerStyle } from "./Style"
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
} from "@material-ui/core"

import MenuIcon from "@material-ui/icons/Menu"
import { makeStyles } from "@material-ui/core/styles"
import { useState, FC, ReactNode } from "react"

type Props = {
  title: string
  content: ReactNode
}

const MaterialDrawer: FC<Props> = ({ title, content }) => {
  const classes = makeStyles((theme) => DrawerStyle(theme))()
  const [isMobile, setIsMobile] = useState(false)
  const handleDrawerToggle = () => setIsMobile((o) => !o)

  return (
    <>
      <AppBar position={"fixed"} className={classes.appBar}>
        <Toolbar>
          <IconButton
            color={"inherit"}
            edge={"start"}
            className={classes.menuButton}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant={"h6"} noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* This impl is visible only on mobile devices */}
        <Hidden smUp>
          <Drawer
            variant="temporary"
            open={isMobile}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
            onClose={handleDrawerToggle}
          >
            {content}
          </Drawer>
        </Hidden>

        {/* This impl is visible only on screens of size md and up */}
        <Hidden xsDown>
          <Drawer
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            open
          >
            {content}
          </Drawer>
        </Hidden>
      </nav>
    </>
  )
}

export default MaterialDrawer
