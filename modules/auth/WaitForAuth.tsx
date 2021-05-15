import { FC, useContext } from "react"
import Spinner from "../../ui/Spinner"
import { AuthContext } from "./AuthProvider"
import { useVerifyLoggedIn } from "./useVerifyLoggedIn"

export const WaitForAuth: FC = ({ children }) => {
  const { connected } = useContext(AuthContext)
  // Render if logged in else return null
  // `useVerifyLoggedIn` will take care of everything else
  if (!useVerifyLoggedIn()) {
    return null
  }

  if (!connected) {
    return (
      <div className="flex flex-col gap-4 w-full h-screen items-center justify-center text-primary-100">
        <Spinner size="4" />
        <p className="text-button">Restoring your session</p>
      </div>
    )
  }

  return <>{children}</>
}
