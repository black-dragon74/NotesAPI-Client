import { useEffect } from "react"
import { useRouter } from "next/router"
import Button from "../ui/Button"
import { useTokenStore } from "../modules/auth/useTokenStore"
import HeaderController from "../modules/display/HeaderController"

// This module does not actually logout. It is
// Expected from the component redirecting to this route to clear the tokens
// Users can optionally click on a button to logout in case the component did not logout successfully
const Logout = () => {
  const { replace } = useRouter()
  const [hasTokens, clearTokens] = useTokenStore(state => [
    !!(state.accessToken && state.refreshToken),
    state.clearTokens,
  ])

  useEffect(() => {
    if (!hasTokens) {
      replace("/")
    }
  }, [replace, hasTokens])

  return (
    <>
      <HeaderController title="Logout" />
      <div className="flex flex-col gap-5 justify-center items-center h-screen w-full">
        <h2 className="text-xl text-primary-100 block">
          You should be logged out automatically. If not
        </h2>
        <Button onClick={clearTokens} color="primary" size="big" transition>
          Click me to logout manually
        </Button>
      </div>
    </>
  )
}

export default Logout
