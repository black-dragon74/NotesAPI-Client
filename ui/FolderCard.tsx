import { FC } from "react"
import Button from "./Button"

type FolderCardProps = {
  title: string
  onUpdate: () => void
  onDelete: () => void
}

const FolderCard: FC<FolderCardProps> = ({
  title,
  children: _,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex justify-between items-center p-2 m-2 rounded-md transition duration-200 ease-in-out bg-primary-800 cursor-pointer hover:bg-primary-700">
      <span className="text-primary-100 font-semibold">{title}</span>
      <div className="flex">
        <Button
          size="tiny"
          color="accent-secondary"
          className="w-5 h-5 m-1"
          onClick={onUpdate}
        >
          <i className="fa fa-edit" />
        </Button>
        <Button size="tiny" className="h-5 w-5 m-1" onClick={onDelete}>
          <i className="fa fa-trash" />
        </Button>
      </div>
    </div>
  )
}

export default FolderCard
