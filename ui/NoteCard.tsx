import { FC } from "react"

type NoteCardProps = {
  title: string
  excerpt?: string
  onClick?: () => void
}

const NoteCard: FC<NoteCardProps> = ({
  title,
  excerpt = "",
  onClick = () => console.error("Unimplemented click handler"),
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col w-full p-4 rounded-lg transition duration-200 ease-in-out bg-primary-800 hover:bg-primary-700"
    >
      <div className="flex w-full justify-between space-x-4">
        <div className="flex text-primary-100 items-center font-bold leading-5 truncate w-full">
          <span className="inline truncate">{title}</span>
        </div>
        <div className="flex flex-shrink-0">
          <div className="text-primary-600 font-bold items-center">Pinned</div>
        </div>
      </div>
      <div className="w-full mt-2 flex">
        <div className="text-primary-300 text-left w-full line-clamp-2">
          <span>{excerpt}</span>
        </div>
      </div>
      {/* <div className="flex mt-2 w-full font-bold text-primary-600 justify-between">
        <div>
          <span className="inline">Created on: xx-xx-xx</span>
        </div>
        <div>
          <span className="inline">Created by: Nick</span>
        </div>
      </div> */}
    </button>
  )
}

export default NoteCard
