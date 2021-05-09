import {
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core"
import {
  TreeView,
  TreeItem,
} from "@material-ui/lab"
import { DrawerStyle } from "../styles"
import MailIcon from "@material-ui/icons/Mail"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import { makeStyles } from "@material-ui/core/styles"
import { Layout } from "../components"
import { WaitForAuth } from "../modules/auth/WaitForAuth"
import dynamic from "next/dynamic"

const useStyles = makeStyles((theme) => DrawerStyle(theme))

const Dash = () => {
  const classes = useStyles()
  const Editor = dynamic(() => import("../modules/editor/editor"), {
    ssr: false,
    loading: () => <p>Loading Editor...</p>,
  })

  const drawerContent = (
    <div>
      <div className={classes.toolbar} style={{ padding: "24px" }}>
        Ola, Nick!
      </div>
      <Divider />
      <TreeView
        style={{ maxWidth: 400, padding: 10 }}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="2" label="Calendar">
          <TreeItem nodeId="5" label="Calendar 1" />
          <TreeItem nodeId="6" label="Calendar 2">
            <TreeItem nodeId="7" label="Calendar 2 - 1" />
          </TreeItem>
        </TreeItem>
      </TreeView>
    </div>
  )

  return (
    <WaitForAuth>
      <Layout title={"Hello"} appBarTitle={"Ola"} navBarContent={drawerContent}>
        <Editor />
      </Layout>
    </WaitForAuth>
  )
}
export default Dash
