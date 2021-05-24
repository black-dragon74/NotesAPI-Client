import { NoteType } from "../../types/NoteType"
import DesktopLayout from "../layouts/DesktopLayout"
import { MiddlePanel } from "../layouts/GridPanels"
import { FC } from "react"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Cookie from "cookie"
import getRoute from "../../lib/getRoute"

interface NotePageProps {
  note?: NoteType
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const NotePage: FC<NotePageProps> = ({
  note,
}): InferGetServerSidePropsType<typeof getServerSideProps> => {
  return (
    <DesktopLayout>
      <MiddlePanel>
        <div className="text-primary">{note?.data}</div>
      </MiddlePanel>
    </DesktopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  console.log(req.headers)
  const headers = req?.headers.cookie || ""
  let id = ""
  let note: NotePageProps = {}

  if (typeof query.id === "string" && query.id !== "") {
    id = query.id
  }

  if (id) {
    const { accessToken } = Cookie.parse(headers)
    try {
      const resp = await getRoute(`/notes/get/${id}`, accessToken)

      if ("data" in resp) {
        note = resp.data
      } else {
        return {
          notFound: true,
        }
      }
    } catch (e) {
      console.error((e as Error).message)
    }
  }

  console.log(note)

  return {
    props: {
      note,
    },
  }
}

export default NotePage
