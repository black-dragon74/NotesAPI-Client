import { useRouter } from "next/router"
import { useEffect } from "react"
import NoteCard from "../../ui/NoteCard"
import useNotesStore from "./useNotesStore"

const NotesListController = () => {
  const { sync, notes, selectedFolder } = useNotesStore()
  const { push } = useRouter()
  const renderNotes = notes?.filter(note => note.folder_id === selectedFolder)

  useEffect(() => {
    sync()
  }, [sync])

  return (
    <div className="flex flex-col gap-3">
      {selectedFolder === -1 ? (
        <p className="text-center text-primary-100">
          Please select a folder from the left panel
        </p>
      ) : null}

      {/* Apologies for this mess but this is how JSX works -_- */}
      {selectedFolder !== -1 &&
        (renderNotes === undefined || renderNotes?.length === 0) && (
          <div className="text-primary-100 text-center font-bold">
            No notes exist in the selected folder
          </div>
        )}

      {renderNotes?.map(note => (
        <NoteCard
          key={note.note_id}
          title={note.name}
          excerpt={note.data}
          onClick={() => push(`/note/${note.note_id}`)}
        />
      ))}
    </div>
  )
}

export default NotesListController
