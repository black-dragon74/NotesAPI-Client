import { useTokenStore } from "../../modules/auth/useTokenStore"
import Button from "../Button"

const RightHeader = () => {
  return (
    <div className="flex space-x-4 justify-end items-center focus:outline-no-chrome w-full text-primary-100">
      <Button
        onClick={() => {
          useTokenStore.getState().clearTokens()
        }}
      >
        Logout
      </Button>
    </div>
  )
}

export default RightHeader
