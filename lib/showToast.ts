import useToastStore from "../modules/toast/useToastStore"

const showErrorToast = (m: string) => {
  useToastStore.getState().show({
    message: m,
    type: "error",
  })
}

const showSuccessToast = (m: string) => {
  useToastStore.getState().show({
    message: m,
    type: "success",
  })
}

export { showErrorToast, showSuccessToast }
