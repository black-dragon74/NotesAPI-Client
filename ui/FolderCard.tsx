import { FC } from "react"
import DeleteIcon from "../icons/DeleteIcon"
import Button from "./Button"

type FolderCardProps = {
  title: string
  onDelete: () => void
}

const FolderCard: FC<FolderCardProps> = ({ title, children: _, onDelete }) => {
  return (
    <div className="flex justify-between items-center p-2 m-2 rounded-md transition duration-200 ease-in-out bg-primary-800 cursor-pointer hover:bg-primary-700">
      <span className="text-primary-100 font-semibold">{title}</span>
      <div className="flex">
        <Button size="tiny" className="h-5 w-5 m-1" onClick={onDelete}>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  )
}

export default FolderCard
