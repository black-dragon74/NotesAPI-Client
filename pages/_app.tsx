import "../styles/globals.scss"
import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: Add viewport and touch-icons meta
  return <Component {...pageProps} />
}

export default MyApp
