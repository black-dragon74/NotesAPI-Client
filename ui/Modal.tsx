import ReactModal from "react-modal"
import { FC } from "react"
import SolidPlus from "../icons/SolidPlus"

const customStyles = {
  default: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: "40px 40px 40px 40px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-800)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 530,
    },
  },
  userPreview: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: 0,
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-900)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 435,
    },
  },
}

type ModalProps = ReactModal["props"] & {
  variant?: keyof typeof customStyles
}

const Modal: FC<ModalProps> = ({ variant = "default", children, ...props }) => {
  return (
    <ReactModal
      shouldCloseOnEsc
      shouldFocusAfterRender
      style={customStyles[variant]}
      {...props}
    >
      <div className="flex flex-col w-full">
        <div className="flex justify-end absolute right-3 top-3">
          <button
            className="p-1 text-primary-100"
            onClick={e => props.onRequestClose?.(e)}
          >
            <SolidPlus className="transform rotate-45" />
          </button>
        </div>
        <div className="focus:outline-none">{children}</div>
      </div>
    </ReactModal>
  )
}

export default Modal
