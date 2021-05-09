import { useEffect } from "react"
import { useRouter } from "next/router"
import { useTokenStore } from "../auth/useTokenStore"

export const LoginPage = () => {
  const hasTokens = useTokenStore(state => state.accessToken && state.refreshToken)
  const { push } = useRouter()

  useEffect(() => {
    if (hasTokens) {
      push("/dash")
    }
  }, [hasTokens, push])

  return (
    <div>Please lomgim</div>
  )
}