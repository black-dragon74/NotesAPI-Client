import { API_URL } from "./constants"

const getRoute = async (path: string, token: string) => {
  const url = `${API_URL}${path}`

  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (resp.status !== 200) {
    throw new Error(await resp.text())
  }

  return await resp.json()
}

export default getRoute
