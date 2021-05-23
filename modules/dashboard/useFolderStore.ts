import { API_URL } from "../../lib/constants"
import { FolderType } from "../../types/FolderType"
import { useTokenStore } from "../auth/useTokenStore"
import create from "zustand"
import { combine } from "zustand/middleware"
const syncFoldersFromServer = async (): Promise<FolderType[]> => {
  const retVal = [] as FolderType[]
  const folderResp = await fetch(`${API_URL}/folders/get`, {
    headers: {
      Authorization: `Bearer ${useTokenStore.getState().accessToken}`,
    },
  })

  if (folderResp.status !== 200) {
    return retVal
  }

  const body = await folderResp.json()
  if (typeof body.data === "undefined") {
    return retVal
  }

  const folders = <Array<FolderType>>body.data

  if (typeof folders === "undefined") {
    return retVal
  }

  return folders
}

// TODO: Ask sid to change the return type when updating the folder
const addFolderToServer = async (
  folder: string
): Promise<Omit<FolderType, "UserID">> => {
  const retVal = {} as FolderType

  const serverResp = await fetch(`${API_URL}/folders/create`, {
    body: `{"name": "${folder}"}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${useTokenStore.getState().accessToken}`,
    },
  })

  if (serverResp.status !== 200) return retVal

  const body = await serverResp.json()

  if (typeof body.success === "undefined") {
    return retVal
  }

  return {
    ID: body.data.folder_id,
    Name: body.data.name,
  }
}

const deleteFolder = async (id: number): Promise<boolean> => {
  const serverResp = await fetch(`${API_URL}/folders/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${useTokenStore.getState().accessToken}`,
    },
    body: `{"folder_id": ${id}}`,
  })

  if (serverResp.status !== 200) return false

  const body = await serverResp.json()

  if (typeof body.data === "undefined") return false

  // TODO: Fix it after API changes
  return (body.data as number) === id
}

const useFolderStore = create(
  combine(
    {
      folders: [] as FolderType[],
      fetched: false,
    },
    (set, get) => ({
      sync: async () => {
        const newFolders = await syncFoldersFromServer()
        set({ folders: newFolders, fetched: true })
      },
      add: async (folder: string) => {
        const resp = await addFolderToServer(folder)
        if (typeof resp.ID !== "undefined") {
          if (get().folders === null) {
            set({ folders: [{ ...resp, UserID: 0 }] })
          } else {
            set(state => ({
              folders: [...state.folders, { ...resp, UserID: 0 }],
            }))
          }
        }
      },
      remove: async (id: number) => {
        const resp = await deleteFolder(id)

        if (resp === true) {
          set(state => ({ folders: state.folders.filter(f => f.ID !== id) }))
        }

        return resp
      },
      clear: () => {
        set({ folders: [], fetched: false })
      },
    })
  )
)

export default useFolderStore
