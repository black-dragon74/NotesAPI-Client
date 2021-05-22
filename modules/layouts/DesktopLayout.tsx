import { FC, ReactNode } from "react"
import { WaitForAuth } from "../auth/WaitForAuth"
import MainLayout from "./MainLayout"

type DesktopLayoutProps = {
  leftPanel?: ReactNode
  rightPanel?: ReactNode
  mobileHeader?: ReactNode
}
const DesktopLayout: FC<DesktopLayoutProps> = ({
  mobileHeader = undefined,
  leftPanel,
  rightPanel,
  children,
}) => {
  return (
    <WaitForAuth>
      <MainLayout
        leftPanel={leftPanel}
        rightPanel={rightPanel}
        mobileHeader={mobileHeader}
      >
        {children}
      </MainLayout>
    </WaitForAuth>
  )
}

export default DesktopLayout
