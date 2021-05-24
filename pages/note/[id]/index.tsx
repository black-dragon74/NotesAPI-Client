import { FC } from "react"
import { GetServerSideProps } from "next"
import Cookie from "cookie"
import DesktopLayout from "../../../modules/layouts/DesktopLayout"
import { MiddlePanel } from "../../../modules/layouts/GridPanels"
import { NoteType } from "../../../types/NoteType"
import getRoute from "../../../lib/getRoute"
import { isServer } from "../../../lib/isServer"
import HeaderController from "../../../modules/display/HeaderController"

interface NotePageProps {
  note: NoteType
}

const NotePage: FC<NotePageProps> = ({ note }) => {
  return (
    <>
      <HeaderController title={note?.name} />
      <DesktopLayout>
        <MiddlePanel>
          <div className="text-primary">{note?.data}</div>
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
