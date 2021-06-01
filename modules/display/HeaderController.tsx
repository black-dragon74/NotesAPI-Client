import { FC } from "react"
import Head from "next/head"
import { NAME } from "../../lib/constants"

type HeaderControllerProps = {
  title?: string
  description?: string
  additionalKeywords?: string[]
  owner?: string
}

const getTitle = (title?: string) => {
  const prepend = title ? `${title} | ` : ""

  return prepend + NAME
}

const HeaderController: FC<HeaderControllerProps> = ({
  title,
  description = "Secure Notes API client",
  additionalKeywords = [],
  owner,
}) => {
  return (
    <Head>
      <title>{getTitle(title)}</title>
      <meta name="description" content={description} />
      {owner ? <meta name="author" content={owner} /> : ""}
      <meta
        name="keywords"
        content={`SINKSP, Instant Note Keeping, PasteBin, HasteBin${additionalKeywords?.map(
          k => `, ${k}`
        )}`}
      />
      <meta name="theme-color" content="#EFE7DD" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/fontawesome.min.css"
      />
    </Head>
  )
}

export default HeaderController
