import { ReactNode } from "react"
import { v4 } from "uuid"
import create from "zustand"
import { combine } from "zustand/middleware"
import { ToastDurations, ToastTypes } from "../../ui/Toast"

type Toast = {
  id: string
  button?: ReactNode
  duration?: ToastDurations
  type: ToastTypes
  message: string
}

const useToastStore = create(
  combine({ toasts: [] as Toast[] }, set => ({
    hide: (id: string) =>
      set(x => ({ toasts: x.toasts.filter(ele => ele.id !== id) })),
    show: (t: Omit<Toast, "id">) => {
      set(x => {
        const removedToasts = x.toasts.filter(ele => ele.message !== t.message)
        return {
          toasts: [...removedToasts, { ...t, id: v4() }],
        }
      })
    },
  }))
)

export default useToastStore
