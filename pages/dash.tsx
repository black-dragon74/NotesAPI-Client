import { useState } from "react"
import { showErrorToast } from "../lib/showToast"
import CreateNewNoteModal from "../modules/dashboard/CreateNewNoteModal"
import FolderView from "../modules/dashboard/FolderView"
import NotesListController from "../modules/dashboard/NotesListController"
import useNotesStore from "../modules/dashboard/useNotesStore"
import HeaderController from "../modules/display/HeaderController"
import DesktopLayout from "../modules/layouts/DesktopLayout"
import { MiddlePanel } from "../modules/layouts/GridPanels"
import DashHeader from "../ui/DashHeader"

const Dash = () => {
  const [showNoteModal, setShowNoteModal] = useState(false)
  const { selectedFolder } = useNotesStore()
  return (
    <DesktopLayout leftPanel={<FolderView />} rightPanel={<div />}>
      <HeaderController title="Dashboard"></HeaderController>
      <MiddlePanel
        stickyChildren={
          <DashHeader
            title="Your Notes"
            ctaTitle="New Note"
            onCtaClicked={() => {
              if (selectedFolder === -1) {
                showErrorToast("Please select a folder first")
              } else {
                setShowNoteModal(true)
              }
            }}
          />
        }
      >
        <NotesListController />
        {showNoteModal && (
          <CreateNewNoteModal onRequestClose={() => setShowNoteModal(false)} />
        )}
      </MiddlePanel>
    </DesktopLayout>
  )
}
export default Dash
