import "../styles/globals.scss"
import "font-awesome/css/font-awesome.min.css"
import { AppProps } from "next/app"
import Head from "next/head"
import { isServer } from "../lib/isServer"
import { useEffect, useState } from "react"
import { AuthContextProvider } from "../modules/auth/AuthProvider"
import { QueryClient, QueryClientProvider } from "react-query"
import ToastController from "../modules/toast/ToastController"
import ReactModal from "react-modal"

ReactModal.setAppElement("#__next")

function MyApp({ Component, pageProps }: AppProps) {
  // Perform SSR only when meant to, i.e.  if `getInitialProps` is present
  const skipSSR = isServer && !Component.getInitialProps
  const [isMounted, setIsMounted] = useState(false)

  // TODO: Use a custom query client that can handle errors automatically
  const queryClient = new QueryClient()

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
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
          />
        </Head>
        <Component {...pageProps} />
        <ToastController />
      </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default MyApp
