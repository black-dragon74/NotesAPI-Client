import "../styles/globals.scss"
import { AppProps } from "next/app"
import Head from "next/head"
import { useEffect, useState } from "react"
import { AuthContextProvider } from "../modules/auth/AuthProvider"
import ToastController from "../modules/toast/ToastController"
import ReactModal from "react-modal"
import { isServer } from "../lib/isServer"

ReactModal.setAppElement("#__next")

function MyApp({ Component, pageProps }: AppProps) {
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
    <AuthContextProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
      <ToastController />
    </AuthContextProvider>
  )
}

export default MyApp
