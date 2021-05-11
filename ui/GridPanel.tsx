import { FC } from "react"

const GridPanel: FC = ({ children }) => {
  return <div className="flex flex-col flex-1 w-full">{children}</div>
}

const FixedGridPanel: FC = ({ children }) => {
  return (
    <div className="flex pt-5 flex-col flex-1 sticky top-0 w-full h-screen">
      {children}
    </div>
  )
}

export { GridPanel, FixedGridPanel }
