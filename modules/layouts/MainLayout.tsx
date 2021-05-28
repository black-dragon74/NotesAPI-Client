import { FC, ReactNode } from "react"
import useScreenType, { ScreenType } from "../../hooks/useScreenType"
import { MainInnerGrid } from "../../ui/MainGrid"
import { LeftPanel, RightPanel } from "./GridPanels"

type MainLayoutProps = {
  leftPanel?: ReactNode
  rightPanel?: ReactNode
  mobileHeader?: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({
  leftPanel = <div />,
  rightPanel = <div />,
  mobileHeader,
  children,
}) => {
  const screenType = useScreenType()
  const mHeader = mobileHeader || <div>Implement Mobile Header</div>
  const items = null // TODO: Implement mobile header

  let prepend = null
  let gridContents = null

  switch (screenType) {
    case ScreenType.ThreeCol:
      gridContents = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      )
      break
    case ScreenType.TwoCol:
      gridContents = (
        <>
          <LeftPanel>
            <div />
          </LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      )
      break
    case ScreenType.OneCol:
      gridContents = (
        <>
          <LeftPanel>
            <div />
          </LeftPanel>
          {children}
          {/* <div>Implement floating shiz</div> */}
        </>
      )
      break
    case ScreenType.FullScreen:
      prepend = (
        <>
          {mHeader}
          {/* <div>Implement mobile nav</div> */}
        </>
      )
      gridContents = (
        <>
          {children}
          {/* <div>Floating shiz</div> */}
          {/* <div>Overlay shiz</div> */}
        </>
      )
      break
  }

  return (
    <>
      <div className="fixed left-0 w-full z-10 top-0">{prepend}</div>
      <div
        className={`flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700 ${
          prepend ? "mt-8 mb-7" : ""
        }`}
      >
        <MainInnerGrid>{gridContents}</MainInnerGrid>
      </div>
    </>
  )
}

export default MainLayout
