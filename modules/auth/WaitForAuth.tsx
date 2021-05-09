import { FC } from "react"
import { useVerifyLoggedIn } from "./useVerifyLoggedIn"

export const WaitForAuth: FC = ({ children }) => {
  // Render if logged in else return null
  // `useVerifyLoggedIn` will take care of everything else
  if (!useVerifyLoggedIn()) {
    return null
  }

  return <>{children}</>
}