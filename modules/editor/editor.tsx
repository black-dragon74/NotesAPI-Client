import { useCallback, useState, FC, useEffect } from "react"
import "quill/dist/quill.snow.css"
import Quill from "quill"

const Editor: FC = () => {
  const editorRef = useCallback((callee) => {
    if (callee == undefined) return
    callee.innerHTML = ""
    const editorContainer = document.createElement("div")
    callee.append(editorContainer)
    new Quill(editorContainer, {
      theme: "snow",
    })
  }, [])
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const resizeListener = (_: UIEvent) => setWidth(window.innerWidth)
    window.addEventListener("resize", resizeListener)

    return () => {
      window.removeEventListener("resize", resizeListener)
    }
  }, [])

  return (
    // Quill mounts here!
    <div
      id="editor-root"
      ref={editorRef}
      style={{ width: width - 300 + "px", height: "80vh" }}
    />
  )
}

export default Editor
