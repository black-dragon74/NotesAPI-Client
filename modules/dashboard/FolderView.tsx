import { useState, useRef, useEffect } from "react"
import SolidPlus from "../../icons/SolidPlus"
import { showErrorToast } from "../../lib/showToast"
import Button from "../../ui/Button"
import ConfirmModal from "../../ui/ConfirmModal"
import FolderCard from "../../ui/FolderCard"
import Spinner from "../../ui/Spinner"
import CreateNewFolderModal from "./CreateNewFolderModal"
import useFolderStore from "./useFolderStore"

const FolderView = () => {
  const selectedFolder = useRef(-1)
  const selectedFolderName = useRef("")
  const [showAddModel, setShowAddModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { folders, fetched, remove, sync } = useFolderStore()

  useEffect(() => {
    sync()
  }, [sync])

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-5">
        <h4 className="text-primary-100">Your Folders</h4>
        <Button size="small" onClick={() => setShowAddModal(true)}>
          <SolidPlus />
        </Button>
      </div>
      {fetched ? (
        folders?.map(folder => {
          return (
            <FolderCard
              key={folder.ID}
              title={folder.Name}
              onDelete={() => {
                selectedFolder.current = folder.ID
                selectedFolderName.current = folder.Name
                setShowConfirm(true)
              }}
            />
          )
        })
      ) : (
        <Spinner />
      )}
      {showAddModel && (
        <CreateNewFolderModal onClose={() => setShowAddModal(false)} />
      )}
      {showConfirm && (
        <ConfirmModal
          title="Delete?"
          subtitle={`Are you sure you want to delete the folder: ${selectedFolderName.current}`}
          type="destructive"
          onPositiveResponse={async () => {
            const removed = await remove(selectedFolder.current)
            if (!removed) {
              showErrorToast(
                `Failed to remove the folder ${selectedFolderName.current}`
              )
            }
            setShowConfirm(false)
          }}
          onNegativeResponse={() => setShowConfirm(false)}
        />
      )}
    </div>
  )
}

export default FolderView
