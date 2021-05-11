import { FC } from "react"
import Toast from "../../ui/Toast"
import useToastStore from "./useToastStore"

const ToastController: FC = () => {
  const { toasts, hide } = useToastStore()
  return (
    <div className="flex w-full fixed bottom-0 justify-center">
      <div className="flex flex-col w-full">
        {toasts.map(toast => (
          <div key={toast.id}>
            <Toast
              type={toast.type}
              message={toast.message}
              duration={toast.duration}
              onClose={() => hide(toast.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ToastController
