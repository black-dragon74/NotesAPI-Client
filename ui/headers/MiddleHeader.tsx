import useScreenType, { ScreenType } from "../../hooks/useScreenType"
import { NAME } from "../../lib/constants"
import LeftHeader from "./LeftHeader"
import RightHeader from "./RightHeader"

const MiddleHeader = () => {
  const screenType = useScreenType()

  return (
    <div className="flex flex-1 justify-center w-full">
      {screenType === ScreenType.FullScreen && (
        <div className="flex mr-4">
          <LeftHeader />
        </div>
      )}

      <div className="flex text-primary-100 text-bold p-2 w-full items-center justify-center">
        <h2 className="text-xl block text-center">Welcome to {NAME}</h2>
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
