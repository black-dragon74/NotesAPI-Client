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
      Click krdo gays!
    </button>
  )
}

export default NoteCard
