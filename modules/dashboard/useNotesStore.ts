import create from "zustand"
import { combine } from "zustand/middleware"
import { API_URL } from "../../lib/constants"
import { NoteType } from "../../types/NoteType"
import { useTokenStore } from "../auth/useTokenStore"

const notesURL = `${API_URL}/notes`

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
          renderNotes: get().notes.filter(n => n.FolderID === id),
          selectedFolder: id,
        }),
    })
  )
)

export default useNotesStore
