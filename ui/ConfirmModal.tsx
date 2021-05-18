import { FC } from "react"
import Button from "./Button"
import Modal from "./Modal"

type ConfirmModalProps = {
  title: string
  subtitle: string
  positiveTitle?: string
  negativeTitle?: string
  type?: "normal" | "destructive"
  onPositiveResponse?: () => void
  onNegativeResponse?: () => void
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  title,
  subtitle,
  positiveTitle,
  negativeTitle,
  type = "destructive",
  onPositiveResponse,
  onNegativeResponse,
  children: _,
}) => {
  return (
    <Modal isOpen onRequestClose={onNegativeResponse}>
      <div className={`flex flex-col gap-4 focus:outline-none w-full`}>
        <div className="flex flex-col mb-4">
          <h4 className={`mb-2 text-primary-100`}>{title}</h4>
          <div className={`text-primary-300`}>{subtitle}</div>
        </div>

        <div className="flex flex-row justify-end">
          <Button
            className="mr-2"
            onClick={onPositiveResponse}
            color={type === "normal" ? "accent-secondary" : "primary"}
          >
            {positiveTitle ? positiveTitle : "Yes"}
          </Button>
          <Button
            className={`mr-2`}
            color="secondary"
            onClick={onNegativeResponse}
          >
            {negativeTitle ? negativeTitle : "No"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
