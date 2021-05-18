import { FC, createContext, useMemo } from "react"
import useSessionRefresh from "../../hooks/useSessionRefresh"

type AuthContextType = {
  connected: boolean
}

export const AuthContext = createContext<AuthContextType>({
  connected: false,
})

export const AuthContextProvider: FC = ({ children }) => {
  const connected = useSessionRefresh()

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          connected,
        }),
        [connected]
      )}
    >
      {children}
    </AuthContext.Provider>
  )
}
