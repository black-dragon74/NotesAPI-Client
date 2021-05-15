import { FC } from "react"

const InputErrorMsg: FC = ({ children }) => {
  return <div className="flex text-secondary">{children}</div>
}

export default InputErrorMsg
