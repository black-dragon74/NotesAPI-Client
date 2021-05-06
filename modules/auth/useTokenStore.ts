import create from "zustand"
import { accessTokenKey, refreshTokenKey } from "../../lib/constants"
import { TokenType } from "../../types/TokenType"

export const useTokenStore = create(set => ({
  setTokens: (x: TokenType) => {
    try {
      localStorage.setItem(accessTokenKey, x.accessToken)
      localStorage.setItem(refreshTokenKey, x.refreshToken)
    } catch {
    }
    set(x)
  },
}))
