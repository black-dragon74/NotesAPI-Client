import { useRouter } from "next/router"
import ArcheLogoNotepad from "../icons/ArcheLogoNotepad"
import { useTokenStore } from "../modules/auth/useTokenStore"
import Button from "./Button"

const MobileHeader = () => {
  const { push } = useRouter()

  return (
    <div className="flex w-full flex-row flex-grow justify-between items-center p-3">
      <ArcheLogoNotepad
        width={30}
        height={30}
        style={{ cursor: "pointer" }}
        onClick={() => push("/dash")}
      />
      <Button size="small" onClick={useTokenStore.getState().clearTokens}>
        Logout
      </Button>
    </div>
  )
}

export default MobileHeader
