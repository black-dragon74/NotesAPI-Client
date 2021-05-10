import { Theme } from "@material-ui/core"

export const LoginStyle = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#282c34",
  },
  card: {
    padding: theme.spacing(3),
    height: "400px",
    width: "400px",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
})
