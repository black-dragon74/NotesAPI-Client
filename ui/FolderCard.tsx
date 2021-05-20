import { FC } from "react"
import DeleteIcon from "../icons/DeleteIcon"
import Button from "./Button"

type FolderCardProps = {
  title: string
  selected: boolean
  onDelete: () => void
  onClick: () => void
}

const FolderCard: FC<FolderCardProps> = ({
  title,
  selected,
  children: _,
  onDelete,
  onClick,
}) => {
  const dynClass = `${selected ? "bg-primary-700" : "bg-primary-800"}`
  return (
    <a onClick={onClick}>
      <div
        className={`flex justify-between items-center p-2 m-2 rounded-md transition duration-200 ease-in-out cursor-pointer hover:bg-primary-700 ${dynClass}`}
      >
        <span className="text-primary-100 font-semibold">{title}</span>
        <div className="flex">
          <Button size="tiny" className="h-5 w-5 m-1" onClick={onDelete}>
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </a>
  )
}

export default FolderCard
