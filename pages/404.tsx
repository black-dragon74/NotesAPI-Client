import { useEffect } from "react"
import { useRouter } from "next/router"

export default function ErrorPage() {
  const { replace } = useRouter()
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const timer = setTimeout(() => replace("/dash"), 1000)

    return () => clearTimeout(timer)
  }, [])

  return <div>Hemlo, what doing. Taking home.</div>
}
