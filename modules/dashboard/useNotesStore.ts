import create from "zustand"
import { combine } from "zustand/middleware"
import { API_URL } from "../../lib/constants"
import { NoteType } from "../../types/NoteType"
import { useTokenStore } from "../auth/useTokenStore"

const notesURL = `${API_URL}/notes`
type NewNoteType = Omit<NoteType, "note_id">

const getNotesFromSever = async (): Promise<NoteType[]> => {
  const req = await fetch(`${notesURL}/getall`, {
    headers: {
      Authorization: `Bearer ${useTokenStore.getState().accessToken}`,
    },
  })

  if (req.status !== 200) return []
  const body = await req.json()

  if (typeof body.data === "undefined") return []

  const notes: NoteType[] = body.data

  return notes
}

const addNoteToServer = async (val: NewNoteType): Promise<NoteType> => {
  const retVal = {} as NoteType
  const req = await fetch(`${notesURL}/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${useTokenStore.getState().accessToken}`,
    },
    body: JSON.stringify(<NewNoteType>{
      name: val.name,
      folder_id: val.folder_id,
      data: val.data,
    }),
  })

  if (req.status !== 200) return retVal
  const body = await req.json()

  if (typeof body.success === "undefined" || typeof body.data === "undefined") {
    return retVal
  }

  if ((body.success as boolean) !== true) return retVal

  return {
    ...val,
    note_id: body.data.note_id,
  }
}

const useNotesStore = create(
  combine(
    {
      notes: [] as NoteType[],
      renderNotes: [] as NoteType[],
      fetched: false,
      selectedFolder: -1 as number,
    },
    (set, get) => ({
      sync: async () => {
        const notes = await getNotesFromSever()

        if (typeof notes === "undefined") return null

        set({ notes, fetched: true })
      },
      select: (id: number) =>
        set({
          renderNotes: get().notes?.filter(n => n.folder_id === id),
          selectedFolder: id,
        }),
      insert: async (a: NewNoteType) => {
        const result = await addNoteToServer(a)
        if (typeof result.note_id === "undefined") return false
        set(state => ({ notes: [...(state.notes || []), result] }))
        return true
      },
      read: (noteID: number) => {
        return get().notes.find(e => e.note_id === noteID)
      },
    })
  )
)

export default useNotesStore
