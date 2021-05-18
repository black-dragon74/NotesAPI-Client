import { useTokenStore } from "./useTokenStore"
import { useEffect } from "react"
import { useRouter } from "next/router"

export const useVerifyLoggedIn = () => {
  const hasTokens = useTokenStore(
    state => state.accessToken && state.refreshToken
  )
  const { replace } = useRouter()

  useEffect(() => {
    if (!hasTokens) {
      replace(`/`)
    }
  }, [hasTokens, replace])

  return hasTokens
}
