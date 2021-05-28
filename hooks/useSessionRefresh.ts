import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { API_URL } from "../lib/constants"
import { useTokenStore } from "../modules/auth/useTokenStore"
import { TokenType } from "../types/TokenType"

const validateURL = `${API_URL}/session/validate`
const refreshURL = `${API_URL}/session/refresh`

type ValidatorType = {
  // Valid is returned when the success validation check is passed
  // If validation is falsy, we try to refresh, if such is the case, we return `refreshed` and `token`
  // Else, both things are invalid and we log the user out by returning `failed`
  opcode: "valid" | "refreshed" | "failed"
  token?: TokenType
}

const validate = async ({
  accessToken,
  refreshToken,
}: TokenType): Promise<ValidatorType> => {
  const validateResp = await fetch(validateURL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  // Session is valid, all systems go!
  if (validateResp.ok) {
    return { opcode: "valid" }
  }

  // Otherwise, maybe the token is expired?
  const refreshResp = await fetch(refreshURL, {
    method: "POST",
    headers: {
      refresh_token: refreshToken,
    },
  })

  // Token refresh failed
  if (!refreshResp.ok) {
    return { opcode: "failed" }
  }

  // Otherwise get and return the data
  const body = await refreshResp.json()
  const token: TokenType = {
    accessToken: body.data.authentication_token,
    refreshToken: body.data.refresh_token,
  }

  return { opcode: "refreshed", token }
}

const useSessionRefresh = () => {
  const [connected, setConnected] = useState(false)
  const { accessToken, refreshToken, setTokens, clearTokens } =
    useTokenStore.getState()
  const { replace } = useRouter()
  const hasTokens = !!(accessToken && refreshToken)

  useEffect(() => {
    if (!connected && hasTokens) {
      validate({ accessToken, refreshToken }).then(v => {
        switch (v.opcode) {
          case "valid":
            setConnected(true)
            break
          case "failed":
            clearTokens()
            replace("/logout")
            break
          case "refreshed":
            setTokens(v.token || ({} as TokenType))
            setConnected(true)
            break
        }
      })
    }
    // eslint-disable-next-line
  }, [connected, accessToken, refreshToken, hasTokens, replace])

  return connected
}

export default useSessionRefresh
