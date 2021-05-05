import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core"
import { DrawerStyle } from "../styles"
import MenuIcon from "@material-ui/icons/Menu"
import MailIcon from "@material-ui/icons/Mail"
import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react"
import { Layout } from "../components"

const useStyles = makeStyles((theme) => DrawerStyle(theme))

const Home = () => {
  const classes = useStyles()

  const drawerContent = (
    <div>
      <div className={classes.toolbar} style={{ padding: "24px" }}>
        Ola, Nick!
      </div>
      <Divider />
      <List>
        {["One", "Two", "Three"].map((val, idx) => (
          <ListItem button key={idx}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={val} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Layout title={"Hello"} appBarTitle={"Ola"} navBarContent={drawerContent}>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography>
    </Layout>
  )
}
export default Home
