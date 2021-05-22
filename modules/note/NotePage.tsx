import { useRouter } from "next/router"
import { useEffect } from "react"
import Spinner from "../../ui/Spinner"
import useNotesStore from "../dashboard/useNotesStore"
import HeaderController from "../display/HeaderController"
import DesktopLayout from "../layouts/DesktopLayout"
import { MiddlePanel } from "../layouts/GridPanels"

const NotePage = () => {
  const { query } = useRouter()
  const { read, fetched, sync } = useNotesStore()

  let id = ""
  if (typeof query.id === "string" && query.id !== "") {
    id = query.id
  }

  useEffect(() => {
    if (!fetched) {
      sync()
    }
  }, [fetched, sync])

  return (
    <>
      <HeaderController title={read(parseInt(id))?.Name} />
      <DesktopLayout leftPanel={<div />} rightPanel={<div />}>
        <MiddlePanel>
          <div className="flex flex-col text-primary-100 text-justify justify-center items-center">
            {read(parseInt(id))?.Data || <Spinner />}
          </div>
        </MiddlePanel>
      </DesktopLayout>
    </>
  )
}

export default NotePage
