import { FC } from "react"
import { GetServerSideProps } from "next"
import Cookie from "cookie"
import { NoteType } from "../../../types/NoteType"
import getRoute from "../../../lib/getRoute"
import { isServer } from "../../../lib/isServer"
import InnerNotePage from "../../../modules/note/NotePage"

interface NotePageProps {
  note: NoteType
}

const NotePage: FC<NotePageProps> = ({ note }) => {
  return <InnerNotePage note={note} />
}

// ssr
export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const headers = req.headers.cookie || ""
  const { accessToken } = Cookie.parse(headers)
  let id = ""
  let note = {} as NoteType

  if (!accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  if (typeof query.id === "string" && query.id !== "") {
    id = query.id
  }

  if (isServer && id) {
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
