import "../styles/SCSS/globals.scss"
import { appTheme } from "../styles"
import { ThemeProvider } from "@material-ui/core/styles"
import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
