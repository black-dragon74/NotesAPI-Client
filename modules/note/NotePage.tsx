import { FC, useRef, useState } from "react"
import dynamic from "next/dynamic"
import DesktopLayout from "../../modules/layouts/DesktopLayout"
import { MiddlePanel } from "../../modules/layouts/GridPanels"
import { NoteType } from "../../types/NoteType"
import HeaderController from "../../modules/display/HeaderController"
import Spinner from "../../ui/Spinner"
import Button from "../../ui/Button"
import useNotesStore from "../../modules/dashboard/useNotesStore"
import { showErrorToast, showSuccessToast } from "../../lib/showToast"
import { useRouter } from "next/router"
import ConfirmModal from "../../ui/ConfirmModal"
import MobileHeader from "../../ui/MobileHeader"

interface NotePageProps {
  note: NoteType
}

const InnerNotePage: FC<NotePageProps> = ({ note }) => {
  const content = useRef(note.data || "")
  const { replace } = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)

  // Skip ssr for this component
  const Editor = dynamic(() => import("../../modules/editor/editor"), {
    ssr: false,
    // eslint-disable-next-line
    loading: () => (
      <div className="flex flex-col gap-4 w-full justify-center">
        <Spinner />
        <h2 className="text-xl text-primary-100 text-center">
          Loading editor...
        </h2>
      </div>
    ),
  })

  return (
    <>
      <HeaderController title={note.name} />
      <DesktopLayout mobileHeader={<MobileHeader />}>
        <MiddlePanel
          stickyChildren={
            <div className="flex justify-between items-end mb-5">
              <h4 className="text-primary-100">{note.name}</h4>
              <div className="flex flex-row gap-2">
                <Button
                  color="primary-300"
                  onClick={async () => {
                    const success = await useNotesStore.getState().update({
                      note_id: note.note_id,
                      name: note.name,
                      folder_id: note.folder_id,
                      data: content.current,
                    })

                    if (success) {
                      showSuccessToast("Note updated successfully")
                    } else {
                      showErrorToast("Failed to update the note")
                    }
                  }}
                >
                  Update
                </Button>

                <Button onClick={() => setShowConfirm(true)}>Delete</Button>
              </div>
            </div>
          }
        >
          <Editor
            onChange={v => (content.current = v)}
            value={content.current}
          />
          {showConfirm && (
            <ConfirmModal
              title={`Deleting ${note.name}`}
              subtitle={"Are you sure you want to delete this note?"}
              onPositiveResponse={async () => {
                const success = await useNotesStore.getState().delete(note)

                if (success) {
                  showSuccessToast("Note deleted successfully.")
                  replace("/dash")
                } else {
                  showErrorToast("Unable to delete the note.")
                }
              }}
              onNegativeResponse={() => setShowConfirm(false)}
            />
          )}
        </MiddlePanel>
      </DesktopLayout>
    </>
  )
}

export default InnerNotePage
