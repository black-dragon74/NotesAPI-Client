import { FC } from "react"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import InputField from "../../components/form-fields/InputField"
import { Formik } from "formik"
import useFolderStore from "./useFolderStore"

type CreateNewFolderModalProps = {
  onClose: () => void
  mode?: "create" | "update"
  data?: {
    name: string
  }
}

const CreateNewFolderModal: FC<CreateNewFolderModalProps> = ({
  onClose,
  data,
  mode = "create",
}) => {
  return (
    <Modal isOpen onRequestClose={onClose}>
      <Formik<{
        name: string
      }>
        validateOnChange={false}
        validateOnBlur={false}
        validate={({ name }) => {
          const errors: Record<string, string> = {}

          if (name.length < 2 || name.length > 20) {
            errors.name = "Name length should be >= 2 and < 20"
          }

          return errors
        }}
        initialValues={data ? data : { name: "" }}
        onSubmit={async ({ name }) => {
          console.log("Creating folder with title " + name)
          await useFolderStore.getState().add(name)
          onClose()
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form
            className={`grid grid-cols-3 gap-4 focus:outline-none w-full`}
            onSubmit={handleSubmit}
          >
            <div className={`col-span-3 block`}>
              <h4 className={`mb-2 text-primary-100`}>
                {mode === "update" ? "Rename Folder" : "Create Folder"}
              </h4>
              <div className={`text-primary-300`}>
                Please enter the name for the new folder
              </div>
            </div>
            <div className={`flex h-full w-full col-span-3`}>
              <InputField
                className={`rounded-8 bg-primary-400 h-6`}
                name="name"
                maxLength={60}
                placeholder="Enter new folder name"
                autoFocus
                autoComplete="off"
              />
            </div>

            <div className={`flex pt-2 space-x-3 col-span-full items-center`}>
              <Button loading={isSubmitting} type="submit" className={`mr-3`}>
                {mode === "update" ? "Update" : "Create"}
              </Button>
              <Button type="button" color="secondary" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateNewFolderModal
