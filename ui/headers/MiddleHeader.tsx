import useScreenType, { ScreenType } from "../../hooks/useScreenType"
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

      <div className="text-primary-100 text-bold">
        <h2 className="text-2xl">Welcome, Nick!</h2>
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
