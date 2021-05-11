import { useMediaQuery } from "react-responsive"

export enum ScreenType {
  OneCol,
  TwoCol,
  ThreeCol,
  FullScreen,
}

const useScreenType = (): ScreenType => {
  const is3Cols = useMediaQuery({ minWidth: 1336 })
  const is2Cols = useMediaQuery({ minWidth: 1265 })
  const is1Cols = useMediaQuery({ minWidth: 800 })

  if (is3Cols) return ScreenType.ThreeCol // lg
  if (is2Cols) return ScreenType.TwoCol // md
  if (is1Cols) return ScreenType.OneCol // sm

  return ScreenType.FullScreen // xs
}

export default useScreenType
