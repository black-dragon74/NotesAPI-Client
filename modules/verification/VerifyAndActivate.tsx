import { useRouter } from "next/router"
import { useEffect } from "react"
import { API_URL } from "../../lib/constants"
import { showErrorToast, showSuccessToast } from "../../lib/showToast"
import Spinner from "../../ui/Spinner"
import { useTokenStore } from "../auth/useTokenStore"
import HeaderController from "../display/HeaderController"

type ParsedURLQuery = NodeJS.Dict<string | string[]>

const verifyUser = async (query: ParsedURLQuery): Promise<boolean> => {
  let nonce = ""
  if (query.verificationToken && typeof query.verificationToken === "string") {
    nonce = query.verificationToken
  }

  // There is no verification Token. Bail
  if (nonce === "") {
    return false
  }

  // Try and activate
  const url = `${API_URL}/users/activate`
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ verification_token: nonce }),
  })
  const body = await resp.json()

  // If there is no data, return
  if (!resp.ok || !body.data || typeof body.data === "undefined") {
    return false
  }

  // Else, we go brrr
  return !body.data.verification_pending as boolean
}

const VerifyAndActivate = () => {
  const hasTokens = useTokenStore(
    state => !!(state.accessToken && state.refreshToken)
  )
  const { push, replace, query } = useRouter()

  // If logged in, push to dash
  useEffect(() => {
    if (hasTokens) {
      replace("/dash")
    }
  }, [hasTokens, replace])

  // Otherwise, just try to verify pls
  useEffect(() => {
    if (hasTokens) return

    if (typeof query.verificationToken === "undefined") {
      return
    }

    verifyUser(query)
      .then(activated => {
        if (activated) {
          showSuccessToast("Activation successful. Please login.")
        } else {
          showErrorToast("Failed to verify the user")
        }
        push("/")
      })
      .catch(_ => {
        showErrorToast("Failed to process the activation request")
        push("/")
      })
  }, [hasTokens, query, push, replace])

  return (
    <>
      <HeaderController title="Verifying" />
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <Spinner />
        <h2 className="font-bold text-xl text-primary-100">Verifying</h2>
      </div>
    </>
  )
}

export default VerifyAndActivate
