import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { useTokenStore } from "../auth/useTokenStore"
import HeaderController from "../display/HeaderController"
import Button from "../../ui/Button"
import GitHubSVG from "../../icons/GitHubSVG"
import ArcheLogo from "../../icons/ArcheLogo"
import InputField from "../../components/form-fields/InputField"
import { Formik } from "formik"
import { showErrorToast, showSuccessToast } from "../../lib/showToast"
import { resendVerification } from "../../lib/passport"

type VerificationFields = {
  email: string
}

export const ResendVerification = () => {
  const hasTokens = useTokenStore(
    state => state.accessToken && state.refreshToken
  )
  const { push, replace } = useRouter()
  useEffect(() => {
    if (hasTokens) {
      push("/dash")
    }
  }, [hasTokens, push])

  return (
    <>
      <div
        className={`grid w-full h-full`}
        style={{ gridTemplateRows: "1fr auto 1fr" }}
      >
        <HeaderController title="Resend Verification" />
        <div className="flex sm:hidden items-center justify-center">
          <ArcheLogo />
        </div>
        <div className="hidden sm:flex" />
        <div className="flex m-auto flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 z-10 sm:w-400 w-full">
          <div className="flex gap-2 flex-col">
            <span className="text-3xl text-primary-100 font-bold">Welcome</span>
            <div className="text-primary-100 flex-wrap">
              Please enter your email and click send to resend verification
              email.
            </div>
          </div>
          <Formik<VerificationFields>
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{ email: "" }}
            validate={({ email }) => {
              const errors: Record<string, string> = {}

              if (!email) {
                errors.email = "Required"
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
              ) {
                errors.email = "Invalid email"
              }

              return errors
            }}
            onSubmit={async ({ email }, { setSubmitting }) => {
              const resp = await resendVerification(
                email,
                `${window.location.origin}/verify`
              )

              if (!resp.success && resp.errorMsg) {
                showErrorToast(resp.errorMsg)
              }

              if (resp.success) {
                showSuccessToast("Verification mail resent")
                replace("/")
              }

              setSubmitting(false)
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form
                className="flex flex-col gap-4 w-full"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <InputField
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <Button loading={isSubmitting} type="submit">
                  Send
                </Button>
              </form>
            )}
          </Formik>
          <div className="flex flex-col gap-1 w-full items-center justify-center">
            <a
              href="#"
              className="block text-accent hover:underline"
              onClick={e => {
                e.preventDefault()
                replace("/")
              }}
            >
              {`<-- Back to login ?`}
            </a>
          </div>
        </div>
        <div className="flex flex-row absolute bottom-0 w-full justify-between items-center px-5 py-5 mt-auto">
          <h1 className="hidden sm:flex">
            <ArcheLogo />
          </h1>
          <div className="flex flex-row gap-6 text-primary-300">
            <a href="#" target="_blank" className="hover:text-primary-200">
              Privacy Policy
            </a>

            <a href="#" target="_blank" className="hover:text-primary-200">
              Report a bug
            </a>

            <a href="#" target="_blank" className="hover:text-primary-200">
              <GitHubSVG width="20" height="20" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
