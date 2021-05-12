import "../styles/globals.scss"
import { AppProps } from "next/app"
import Head from "next/head"
import { isServer } from "../lib/isServer"
import { useEffect, useState } from "react"

function MyApp({ Component, pageProps }: AppProps) {
  // Perform SSR only when meant to, i.e.  if `getInitialProps` is present
  const skipSSR = isServer && !Component.getInitialProps
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // If we have to skip SSR, we must not render anything while unmounted to
  // match React re-hydration expectations and to fix related warnings/errors
  if (skipSSR || !isMounted) {
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
