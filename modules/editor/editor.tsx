import { FC } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

type EditorProps = {
  value: string
  onChange: (content: string) => void
}

const Editor: FC<EditorProps> = ({ value, onChange }) => {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />
}

export default Editor
