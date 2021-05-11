import { WaitForAuth } from "../modules/auth/WaitForAuth"
import dynamic from "next/dynamic"
import Toast from "../ui/Toast"
import ToastController from "../modules/toast/ToastController"
import { useEffect } from "react"
import { showErrorToast, showSuccessToast } from "../lib/showToast"

const Dash = () => {
  useEffect(() => {
    showErrorToast("Hello dorling!")
    showSuccessToast("Henlo dorling!")
  }, [])
  return <ToastController />
}
export default Dash
