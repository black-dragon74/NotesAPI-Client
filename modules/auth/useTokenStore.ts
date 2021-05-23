import create from "zustand"
import { combine } from "zustand/middleware"
import { accessTokenKey, refreshTokenKey } from "../../lib/constants"
import { isServer } from "../../lib/isServer"
import { TokenType } from "../../types/TokenType"
import Cookies from "js-cookie"

const getDefaultValues = (): TokenType => {
  if (!isServer) {
    try {
      return {
        accessToken: localStorage.getItem(accessTokenKey) || "",
        refreshToken: localStorage.getItem(refreshTokenKey) || "",
      }
    } catch {}
  }

  return {
    accessToken: "",
    refreshToken: "",
  }
}

export const useTokenStore = create(
  combine(getDefaultValues(), set => ({
    setTokens: (x: TokenType) => {
      try {
        // Client side
        localStorage.setItem(accessTokenKey, x.accessToken)
        localStorage.setItem(refreshTokenKey, x.refreshToken)

        // Server side
        Cookies.set(accessTokenKey, x.accessToken)
        Cookies.set(refreshTokenKey, x.refreshToken)
      } catch {}
      set(x)
    },
    clearTokens: () => {
      const tempToken: TokenType = { accessToken: "", refreshToken: "" }
      try {
        // Client side
        localStorage.setItem(accessTokenKey, tempToken.accessToken)
        localStorage.setItem(refreshTokenKey, tempToken.refreshToken)

        // Server side
        Cookies.set(accessTokenKey, tempToken.accessToken)
        Cookies.set(refreshTokenKey, tempToken.refreshToken)
      } catch {}
      set(tempToken)
    },
  }))
)
