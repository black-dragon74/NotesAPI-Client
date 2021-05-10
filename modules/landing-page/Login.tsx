import React, { useEffect, FC, ReactNode, useCallback } from "react"
import { useRouter } from "next/router"
import { useTokenStore } from "../auth/useTokenStore"
import HeaderController from "../auth/display/HeaderController"
import Button from "../../ui/Button"
import GitHubSVG from "../../icons/GitHubSVG"

type LoginButtonProps = {
  children: [ReactNode, ReactNode]
  oAuthURL?: string
  onClick?: () => void
}

const LoginButton: FC<LoginButtonProps> = ({
  children,
  onClick,
  oAuthURL,
  ...props
}) => {
  const { query } = useRouter()
  const clickHandler = useCallback(() => {
    if (typeof query.next === "string" && query.next) {
      try {
        localStorage.setItem("nextPath", query.next)
      } catch {}
    }

    window.location.href = oAuthURL as string
  }, [query, oAuthURL])
  return (
    <Button
      className="justify-center py-3 mt-2 text-base"
      size="big"
      color="secondary"
      onClick={oAuthURL ? clickHandler : onClick}
      {...props}
    >
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        {children[0]}
        {children[1]}
        <div />
      </div>
    </Button>
  )
}

export const LoginPage = () => {
  const hasTokens = useTokenStore(
    (state) => state.accessToken && state.refreshToken
  )
  const { push } = useRouter()

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
        <HeaderController title="Login" />
        <div className="flex m-auto flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 z-10 sm:w-400 w-full">
          <div className="flex gap-2 flex-col">
            <span className="text-3xl text-primary-100 font-bold">Welcome</span>
            <div className="text-primary-100 flex-wrap">
              By logging in you agree to our{" "}
              <a href="#" className="hover:underline text-accent">
                terms and conditions.
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <LoginButton onClick={() => console.log("Hello")}>
              <GitHubSVG width="20" height="20" />
              Login with GitHub
            </LoginButton>
          </div>
        </div>
        <div className="flex flex-row absolute bottom-0 w-full justify-between items-center px-5 py-5 mt-auto">
          <h1 className="hidden sm:flex text-primary text-lg">SINKSP</h1>
          <div className="flex flex-row gap-6 text-primary-300">
            <a href="#" target="_blank" className="hover:text-primary-200">
              Privacy Policy
            </a>

            <a href="#" target="_blank" className="hover:text-primary-200">
              Report a bug
            </a>

            <a href="#" target="_blank" className="hover:text-primary-200">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
