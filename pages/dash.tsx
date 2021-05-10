import { WaitForAuth } from "../modules/auth/WaitForAuth"
import dynamic from "next/dynamic"

const Dash = () => {
  const Editor = dynamic(() => import("../modules/editor/editor"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  })
  return (
    <WaitForAuth>
      <Editor />
    </WaitForAuth>
  )
}
export default Dash
