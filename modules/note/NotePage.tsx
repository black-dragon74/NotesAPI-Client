import { NextPage } from "next"
import { useRouter } from "next/router"

interface NotePageProps {}

const NotePage: NextPage<NotePageProps> = () => {
  const { query } = useRouter()
  return <div>Henlo from the other side! {JSON.stringify(query)}</div>
}

NotePage.getInitialProps = async ({ query }) => {
  await Promise.resolve(console.log(query))
  return {}
}

export default NotePage
