import Head from "next/head"
import { FC } from "react"

type Props = {
  title: string
}

const Header: FC<Props> = ({ title }) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <title>{title}</title>
    </Head>
  )
}

export default Header
