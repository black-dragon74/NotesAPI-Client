import { makeStyles } from "@material-ui/core"
import { ReactNode } from "react"
import { FC } from "react"
import MaterialDrawer from "../MaterialDrawer/MaterialDrawer"
import Header from "./Header"
import LayoutStyle from "./Style"

type Props = {
  title: string
  appBarTitle: string
  navBarContent: ReactNode
}

const Layout: FC<Props> = (props) => {
  const classes = makeStyles((theme) => LayoutStyle(theme))()
  return (
    <div className={classes.root}>
      <Header title={props.title} />
      <MaterialDrawer title={props.appBarTitle} content={props.navBarContent} />
      <main>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </div>
      </main>
    </div>
  )
}

export default Layout
