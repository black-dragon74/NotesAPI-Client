import { useRouter } from "next/router"
import { useEffect } from "react"
import NoteCard from "../../ui/NoteCard"
import useNotesStore from "./useNotesStore"

const NotesListController = () => {
  const { sync, renderNotes, selectedFolder } = useNotesStore()
  const { push } = useRouter()

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

      {selectedFolder !== -1 && renderNotes?.length === 0 && (
        <div className="text-primary-100 text-center font-bold">
          No notes exist in the selected folder
        </div>
      )}

      {renderNotes?.map(note => (
        <NoteCard
          key={note.ID}
          title={note.Name}
          excerpt={note.Data}
          onClick={() => push(`/note/${note.ID}`)}
        />
      ))}
    </div>
  )
}

export default NotesListController
