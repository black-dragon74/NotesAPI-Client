import { useRouter } from "next/router"
import { useEffect } from "react"
import { nextPathKey } from "../../lib/constants"
import { useTokenStore } from "./useTokenStore"

const useReadAndStoreQueryTokens = () => {
  const { query: params, push } = useRouter()
  useEffect(() => {
    if (typeof params.error === "string" && params.error) {
      console.error(params.error)
    }

    if (
      typeof params.accessToken === "string" &&
      typeof params.refreshToken === "string" &&
      params.accessToken &&
      params.refreshToken
    ) {
      useTokenStore.getState().setTokens({
        accessToken: params.accessToken,
        refreshToken: params.refreshToken,
      })

      let nextPath = "/dash"

      try {
        const possibleNextPath = localStorage.getItem(nextPathKey)
        if (possibleNextPath && possibleNextPath.startsWith("/")) {
          nextPath = possibleNextPath
          localStorage.setItem(nextPathKey, nextPath)
        }
      } catch {}
      setTimeout(() => push(nextPath), 100)
    }
  }, [push, params])
}

export default useReadAndStoreQueryTokens
