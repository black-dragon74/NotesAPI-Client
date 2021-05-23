import { useEffect } from "react"
import { useRouter } from "next/router"
import Spinner from "../ui/Spinner"
import HeaderController from "../modules/display/HeaderController"

export default function ErrorPage() {
  const { replace } = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => replace("/dash"), 1000)
    return () => clearTimeout(timer)
  }, [replace])

  return (
    <div className="flex flex-col gap-2 w-full h-screen items-center justify-center">
      <HeaderController title="404" />
      <Spinner size="4" />
      <h2 className="text-xl text-primary-100">
        We&apos;ve hit a bump in the road and are taking you home...
      </h2>
    </div>
  )
}
