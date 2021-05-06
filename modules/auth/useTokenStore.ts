import create from "zustand"
import { accessTokenKey, refreshTokenKey } from "../../lib/constants"

export const useTokenStore = create(set => ({
  setTokens: (x: { accessToken: string; refreshToken: string }) => {
    try {
      localStorage.setItem(accessTokenKey, x.accessToken)
      localStorage.setItem(refreshTokenKey, x.refreshToken)
    } catch {
    }
    set(x)
  },
}))
