import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useTokenStore } from "../modules/auth/useTokenStore"
import { TokenType } from "../types/TokenType"

const useSessionRefresh = () => {
  const [connected, setConnected] = useState(false)
  const { accessToken, refreshToken, setTokens } = useTokenStore.getState()
  const { replace } = useRouter()
  const hasTokens = !!(accessToken && refreshToken)

  useEffect(() => {
    if (!connected && hasTokens) {
      axios
        .get("http://localhost:8030/v1/session/validate", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then(resp => {
          if (resp.status === 200) {
            setConnected(true)
          }
        })
        .catch(() => {
          axios
            .post("http://localhost:8030/v1/session/refresh", null, {
              headers: {
                refresh_token: refreshToken,
                "Content-Type": "application/json",
              },
            })
            .then(resp => {
              const tokenResp: TokenType = {
                accessToken: resp.data.data.authentication_token,
                refreshToken: resp.data.data.refresh_token,
              }
              if (tokenResp.accessToken && tokenResp.refreshToken) {
                setConnected(true)
                setTokens({
                  accessToken: tokenResp.accessToken,
                  refreshToken: tokenResp.refreshToken,
                })
              }
            })
            .catch(() => {
              useTokenStore.getState().clearTokens()
              replace("/logout")
            })
        })
    }
    // eslint-disable-next-line
  }, [connected, hasTokens, replace])

  return connected
}

export default useSessionRefresh
