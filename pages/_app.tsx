import "../styles/globals.scss"
import { AppProps } from "next/app"
import Head from "next/head"
import { isServer } from "../lib/isServer"

function MyApp({ Component, pageProps }: AppProps) {
  // Perform SSR only when meant to, i.e.  if `getInitialProps` is present
  if (isServer && !Component.getInitialProps) {
    return null
  }

  // TODO: Add touch-icons meta and manifests
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
