import create from "zustand"
import { combine } from "zustand/middleware"
import { accessTokenKey, refreshTokenKey } from "../../lib/constants"
import { isServer } from "../../lib/isServer"
import { TokenType } from "../../types/TokenType"

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
        localStorage.setItem(accessTokenKey, x.accessToken)
        localStorage.setItem(refreshTokenKey, x.refreshToken)
      } catch {}
      set(x)
    },
  }))
)
