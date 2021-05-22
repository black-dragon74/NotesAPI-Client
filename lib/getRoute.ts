import { useTokenStore } from "../modules/auth/useTokenStore"
import { API_URL } from "./constants"

const getRoute = async (path: string) => {
  const { accessToken } = useTokenStore.getState()
  const url = `${API_URL}${path}`

  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (resp.status !== 200) {
    throw new Error(await resp.text())
  }

  return await resp.json()
}

export default getRoute
