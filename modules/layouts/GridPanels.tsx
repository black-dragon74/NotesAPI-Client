import { FC, ReactNode } from "react"
import useScreenType, { ScreenType } from "../../hooks/useScreenType"
import { FixedGridPanel, GridPanel } from "../../ui/GridPanel"
import LeftHeader from "../../ui/headers/LeftHeader"

const HeaderWrapper: FC = ({ children }) => {
  return <div className="flex mb-7 h-6 items-center">{children}</div>
}

const LeftPanel: FC = ({ children }) => {
  return (
    <FixedGridPanel>
      <HeaderWrapper>
        <LeftHeader />
      </HeaderWrapper>
      {children}
    </FixedGridPanel>
  )
}

const RightPanel: FC = ({ children }) => {
  return (
    <FixedGridPanel>
      <HeaderWrapper>TODO Right Header</HeaderWrapper>
      {children}
    </FixedGridPanel>
  )
}

const MiddlePanel: FC<{ stickyChildren?: ReactNode }> = ({
  children,
  stickyChildren,
}) => {
  const screenType = useScreenType()

  return (
    <GridPanel>
      <div
        className={
          !(screenType === ScreenType.FullScreen && !stickyChildren)
            ? `flex sticky w-full flex-col z-10 bg-primary-900 pt-5`
            : ``
        }
        style={{ top: 0 }}
      >
        {screenType !== ScreenType.FullScreen && (
          <HeaderWrapper>TODO Middle Header</HeaderWrapper>
        )}
        {stickyChildren}
      </div>
      {children}
    </GridPanel>
  )
}

export { LeftPanel, MiddlePanel, RightPanel }
