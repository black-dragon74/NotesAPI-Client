import { FC, useState } from "react"
import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
import Cookie from "cookie"
import DesktopLayout from "../../../modules/layouts/DesktopLayout"
import { MiddlePanel } from "../../../modules/layouts/GridPanels"
import { NoteType } from "../../../types/NoteType"
import getRoute from "../../../lib/getRoute"
import { isServer } from "../../../lib/isServer"
import HeaderController from "../../../modules/display/HeaderController"
import Spinner from "../../../ui/Spinner"
import Button from "../../../ui/Button"

interface NotePageProps {
  note: NoteType
}

const NotePage: FC<NotePageProps> = ({ note }) => {
  const [content, setContent] = useState(() => note.data || "")

  // Skip ssr for this component
  const Editor = dynamic(() => import("../../../modules/editor/editor"), {
    ssr: false,
    // eslint-disable-next-line
    loading: () => (
      <div className="flex flex-col gap-4 w-full justify-center">
        <Spinner />
        <h2 className="text-xl text-primary-100 text-center">
          Loading editor...
        </h2>
      </div>
    ),
  })

  return (
    <>
      <HeaderController title={note.name} />
      <DesktopLayout>
        <MiddlePanel
          stickyChildren={
            <div className="flex justify-between items-end mb-5">
              <h4 className="text-primary-100">{note.name}</h4>
              <div className="flex flex-row gap-2">
                <Button
                  color="primary-300"
                  onClick={() => console.log("Update")}
                >
                  Update
                </Button>

                <Button onClick={() => console.log("Update")}>Delete</Button>
              </div>
            </div>
          }
        >
          <Editor onChange={v => setContent(v)} value={content} />
        </MiddlePanel>
      </DesktopLayout>
    </>
  )
}

// ssr
export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const headers = req.headers.cookie || ""
  let id = ""
  let note = {} as NoteType

  if (typeof query.id === "string" && query.id !== "") {
    id = query.id
  }

  if (isServer && id) {
    const { accessToken } = Cookie.parse(headers)
    try {
      const resp = await getRoute(`/notes/get/${id}`, accessToken)

      if ("data" in resp) note = resp.data
    } catch (e) {
      console.error((e as Error).message)
      return {
        notFound: true,
      }
    }
  }

  return {
    props: {
      note,
    },
  }
}

export default NotePage
