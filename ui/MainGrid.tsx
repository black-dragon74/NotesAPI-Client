import { FC } from "react"
import useScreenType, { ScreenType } from "../hooks/useScreenType"
type MainGridProps = {
  className?: string
}

const MainInnerGrid: FC<MainGridProps> = ({ className = "", children }) => {
  const screenSize = useScreenType()

  let innerClassName = ""
  let innerGridTemplate = ""

  switch (screenSize) {
    case ScreenType.ThreeCol:
      innerGridTemplate = "235px 640px 325px"
      break
    case ScreenType.TwoCol:
      innerGridTemplate = "60px 640px 325px"
      break
    case ScreenType.OneCol:
      innerGridTemplate = "60px 640px"
      break
    case ScreenType.FullScreen:
      innerGridTemplate = "1fr"
      innerClassName = "w-full px-3"
      break
  }

  return (
    <div
      id="main"
      className={`relative ${innerClassName} ${className}`}
      style={{
        display: screenSize === ScreenType.FullScreen ? "flex" : "grid",
        gridTemplateColumns: innerGridTemplate,
        columnGap: 60,
      }}
    >
      {children}
    </div>
  )
}

const MainGrid: FC<MainGridProps> = ({ children }) => {
  return (
    <div className="flex justify-center w-full min-h-screen bg-primary-900">
      <MainInnerGrid>{children}</MainInnerGrid>
    </div>
  )
}

export { MainGrid, MainInnerGrid }
