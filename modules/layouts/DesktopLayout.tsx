import { FC, ReactNode } from "react"
import { WaitForAuth } from "../auth/WaitForAuth"
import FolderView from "../dashboard/FolderView"
import MainLayout from "./MainLayout"

type DesktopLayoutProps = {
  mobileHeader?: ReactNode
}
const DesktopLayout: FC<DesktopLayoutProps> = ({
  mobileHeader = undefined,
  children,
}) => {
  return (
    <WaitForAuth>
      <MainLayout
        leftPanel={<FolderView />}
        rightPanel={<div>Henlo RightPanel</div>}
        mobileHeader={mobileHeader}
      >
        {children}
      </MainLayout>
    </WaitForAuth>
  )
}

export default DesktopLayout
