import { TokenType } from "../types/TokenType"
import { API_URL } from "./constants"

type PassportResponse = {
  statusCode: number
  success: boolean
  errorMsg?: string
  token?: TokenType
}

const resendVerification = async (
  email: string,
  callbackURL: string
): Promise<PassportResponse> => {
  const resendURL = `${API_URL}/users/resendVerification`
  const resp = await fetch(resendURL, {
    method: "POST",
    body: JSON.stringify({ email, verification_callback_url: callbackURL }),
  })
  const body = await resp.json()

  if (!resp.ok) {
    return {
      success: false,
      statusCode: resp.status,
      errorMsg: `Failure in sending the verification email. Status: ${resp.status}`,
    }
  }

  if (
    typeof body.data.verification_email_sent !== "undefined" &&
    (body.data.verification_email_sent as boolean) === true
  ) {
    return {
      success: true,
      statusCode: resp.status,
    }
  }

  return {
    statusCode: resp.status,
    success: false,
    errorMsg: "Failed to send the verification email.",
  }
}

const handleLogin = async (
  email: string,
  password: string
): Promise<PassportResponse> => {
  const loginURL = `${API_URL}/users/login`

  const req = await fetch(loginURL, {
    method: "post",
    body: `{"email": "${email}", "password": "${password}"}`,
  })
  const body = await req.json()

  // The request failed
  if (req.status !== 200) {
    return {
      success: false,
      statusCode: req.status,
      errorMsg: body.error.message,
    }
  }

  // Login failed due to pending verification
  if (
    typeof body.data.verification_pending !== "undefined" &&
    (body.data.verification_pending as boolean) === true
  ) {
    return {
      success: false,
      statusCode: req.status,
      errorMsg: "Please check the verification email to activate your account",
    }
  }

  // Login was successful
  return {
    statusCode: req.status,
    success: true,
    token: {
      accessToken: body.data.authentication_token,
      refreshToken: body.data.refresh_token,
    },
  }
}

const handleSignup = async (
  email: string,
  password: string,
  verification_callback_url: string
): Promise<{
  success: boolean
  user_created?: boolean
  verification_email_sent?: boolean
}> => {
  const signupURL = `${API_URL}/users/signup`
  const resp = await fetch(signupURL, {
    method: "POST",
    body: JSON.stringify({ email, password, verification_callback_url }),
  })
  const body = await resp.json()
  console.log(body)

  if (!resp.ok) {
    return { success: false }
  }

  if (typeof body.data === "undefined") {
    return { success: false }
  }

  return {
    success: body.success as boolean,
    verification_email_sent: body.data.verification_email_sent as boolean,
    user_created: body.data.user_created as boolean,
  }
}

export { handleLogin, handleSignup, resendVerification }
