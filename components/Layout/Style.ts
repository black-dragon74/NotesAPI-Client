import { Theme } from "@material-ui/core"

const LayoutStyle = (theme: Theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
})

export default LayoutStyle
