import { FC } from "react"
import { Form, Formik } from "formik"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import InputField from "../../components/form-fields/InputField"

type NewNoteModalProps = {
  onRequestClose: () => void
  data?: {
    name: string
    content: string
  }
  edit?: boolean
}

const CreateNewNoteModal: FC<NewNoteModalProps> = ({
  onRequestClose,
  data,
  edit,
}) => {
  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Formik<{
        name: string
        content: string
      }>
        validateOnChange={false}
        validateOnBlur={false}
        validate={({ name }) => {
          const errors: Record<string, string> = {}

          if (name.length < 2 || name.length > 60) {
            return {
              name: "Name length should be > 2 and < 60",
            }
          }

          return errors
        }}
        initialValues={data ? data : { name: "", content: "" }}
        onSubmit={async ({ name, content }) => {
          console.log("Submitting note with title " + name)
          console.log("The contents of which are: " + content)
          await Promise.resolve(console.log("hello"))
        }}
      >
        {({ isSubmitting }) => (
          <Form className={`grid grid-cols-3 gap-4 focus:outline-none w-full`}>
            <div className={`col-span-3 block`}>
              <h4 className={`mb-2 text-primary-100`}>
                {edit ? "Edit Note" : "Create Note"}
              </h4>
              <div className={`text-primary-300`}>
                Create new note. Enter the title and the content below
              </div>
            </div>
            <div className={`flex h-full w-full col-span-3`}>
              <InputField
                className={`rounded-8 bg-primary-400 h-6`}
                name="name"
                maxLength={60}
                placeholder="Enter note title"
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className={`flex col-span-3 bg-primary-700 rounded-8`}>
              <InputField
                className={`h-11 col-span-3 w-full`}
                name="content"
                rows={3}
                maxLength={500}
                placeholder="Enter the contents of the note"
                textArea
              />
            </div>

            <div className={`flex pt-2 space-x-3 col-span-full items-center`}>
              <Button loading={isSubmitting} type="submit" className={`mr-3`}>
                {edit ? "Update" : "Create Note"}
              </Button>
              <Button type="button" color="secondary" onClick={onRequestClose}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateNewNoteModal
