import { FC, useCallback, useRef } from "react"
import "quill/dist/quill.snow.css"
import Quill from "quill"

type EditorProps = {
  value: string
  onChange: (val: string) => void
}

const Editor: FC<EditorProps> = ({ value = "", onChange }) => {
  const myQuill = useRef<Quill>()
  const editorRef = useCallback(
    callee => {
      if (callee === null) {
        return
      }

      callee.innerHTML = ""

      const editorContainer = document.createElement("div")
      callee.append(editorContainer)

      // eslint-disable-next-line
      const editor = new Quill(editorContainer, { theme: "snow" })

      if (value !== "") {
        editor.root.innerHTML = value
      }

      editor.on("text-change", (d, o, s) => {
        onChange(editor.root.innerHTML)
      })

      // Store the editor safely
      myQuill.current = editor
    },
    // eslint-disable-next-line
    [onChange]
  )

  return <div id="quill-container" ref={editorRef} />
}

export default Editor
