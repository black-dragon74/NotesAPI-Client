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
  const [hasTokens, setTokens] = useTokenStore(state => [
    !!(state.accessToken && state.refreshToken),
    state.setTokens,
  ])

  useEffect(() => {
    if (!hasTokens) {
      replace("/")
    }
  }, [replace, hasTokens])

  return (
    <>
      <HeaderController title="Logout" />
      <div className="flex ml-auto justify-center items-center h-screen w-full">
        <Button
          onClick={() =>
            setTokens({
              accessToken: "",
              refreshToken: "",
            })
          }
          color="primary"
          size="big"
          transition
        >
          Click here to logout manually
        </Button>
      </div>
    </>
  )
}

export default Logout
