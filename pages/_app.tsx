import "../styles/globals.scss"
import { AppProps } from "next/app"
import { Context as ResponsiveContext } from "react-responsive"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: Add touch-icons meta and manifests
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
        />
      </Head>
      <ResponsiveContext.Provider value={{ width: 1336 }}>
        <Component {...pageProps} />
      </ResponsiveContext.Provider>
    </>
  )
}

export default MyApp
