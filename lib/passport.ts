import { TokenType } from "../types/TokenType"
import { API_URL } from "./constants"

type PassportResponse = {
  statusCode: number
  success: boolean
  errorMsg?: string
  token?: TokenType
}

const handleAuth = async (
  email: string,
  password: string,
  isLogin: boolean
): Promise<PassportResponse> => {
  const signupURL = `${API_URL}/signup`
  const loginURL = `${API_URL}/login`

  const req = await fetch(isLogin ? loginURL : signupURL, {
    method: "post",
    body: `{"email": "${email}", "password": "${password}"}`,
  })
  const body = await req.json()

  if (req.status !== 200) {
    return {
      success: false,
      statusCode: req.status,
      errorMsg: body.error.message,
    }
  }

  return {
    statusCode: req.status,
    success: true,
    token: {
      accessToken: body.data.authentication_token,
      refreshToken: body.data.refresh_token,
    },
  }
}

export default handleAuth
