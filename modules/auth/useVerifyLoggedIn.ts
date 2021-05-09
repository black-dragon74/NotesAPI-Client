import { useTokenStore } from "./useTokenStore"
import { useEffect } from "react"
import { useRouter } from "next/router"

export const useVerifyLoggedIn = () => {
  // TODO: Remove bang from the line below, only for testing!
  const hasTokens = !useTokenStore(state => state.accessToken && state.refreshToken)
  const { asPath, replace } = useRouter()

  useEffect(() => {
    if (!hasTokens) {
      replace(`/?next=${asPath}`)
    }
  }, [hasTokens, asPath, replace])

  return hasTokens
}