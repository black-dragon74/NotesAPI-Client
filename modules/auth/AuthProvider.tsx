import { FC, createContext, useMemo } from "react"
import { TokenType } from "../../types/TokenType"
import { useTokenStore } from "./useTokenStore"
import useSessionRefresh from "../../hooks/useSessionRefresh"

type AuthContextType = {
  connected: boolean
  token?: TokenType
}

export const AuthContext = createContext<AuthContextType>({
  connected: false,
  token: undefined,
})

export const AuthContextProvider: FC = ({ children }) => {
  const connected = useSessionRefresh()
  const { accessToken, refreshToken } = useTokenStore()

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          connected,
          token: {
            accessToken,
            refreshToken,
          },
        }),
        [connected]
      )}
    >
      {children}
    </AuthContext.Provider>
  )
}
