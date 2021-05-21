import { useEffect, useState } from "react"
import useScreenType, { ScreenType } from "../../hooks/useScreenType"
import LeftHeader from "./LeftHeader"
import RightHeader from "./RightHeader"

const MiddleHeader = () => {
  const screenType = useScreenType()
  const quoteURL = "https://goquotes-api.herokuapp.com/api/v1/random?count=1"
  const [quote, setQuote] = useState("")
  useEffect(() => {
    setTimeout(() => {
      fetch(quoteURL)
        .then(resp => {
          resp.json().then(data => {
            console.log(data)
            const fq = data.quotes as {
              author: string
              tag: string
              text: string
            }[]
            const q = fq[0].text
            const author = fq[0].author
            const fullQuote = `${q} - ${author}`

            setQuote(fullQuote)
          })
        })
        .catch()
    }, 1200)
  }, [])

  return (
    <div className="flex flex-1 justify-center w-full">
      {screenType === ScreenType.FullScreen && (
        <div className="flex mr-4">
          <LeftHeader />
        </div>
      )}

      <div className="flex text-primary-100 text-bold p-2 w-full items-center justify-center">
        {quote === "" ? (
          <h2 className="text-xl block text-center">Welcome to Arché Notes</h2>
        ) : (
          <h2 className="text-xl block text-center line-clamp-2">{quote}</h2>
        )}
      </div>

      {(screenType === ScreenType.OneCol ||
        screenType === ScreenType.FullScreen) && (
        <div className="flex ml-4">
          <RightHeader />
        </div>
      )}
    </div>
  )
}

export default MiddleHeader
