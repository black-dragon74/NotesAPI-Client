import "../styles/globals.scss"
import { AppProps } from "next/app"
import { isServer } from "../lib/isServer"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  // Render only on the client side if `getInitialProps` is not present
  // FIXME: Can be avoided if we use `useScreenType` hook on server-side
  if (isServer && !Component.getInitialProps) {
    return null
  }

  // TODO: Add viewport and touch-icons meta
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
