import { FC } from "react"
import Button from "./Button"

type DashHeaderProps = {
  title: string
  ctaTitle: string
  onCtaClicked?: () => void
}

const DashHeader: FC<DashHeaderProps> = ({ title, ctaTitle, onCtaClicked }) => {
  return (
    <div className="flex justify-between items-end ml-4 mb-5">
      <h4 className="text-primary-100">{title}</h4>
      <Button transition onClick={onCtaClicked}>
        {ctaTitle}
      </Button>
    </div>
  )
}

export default DashHeader
