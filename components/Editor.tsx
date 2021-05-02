import {useCallback} from "react";
import 'quill/dist/quill.snow.css'
import Quill from 'quill'

const Editor = () => {
    // Cannot use `useRef` with `useEffect` here as sometimes ref is undefined
    // See: https://reactjs.org/docs/hooks-effect.html#explanation-why-effects-run-on-each-update
    // Using `useCallback` guarantees that our ref will always be defined
    const editorRef = useCallback(container => {
        if (container == null) return

        // Clear previous effects
        container.innerHTML = ''

        // Create new element
        const editor = document.createElement("div")
        container.append(editor)

        // Init Quill on the new elem
        new Quill(editor, {
            theme: 'snow'
        })
    }, [])

    return (
        <div id="editor-container" ref={editorRef}>
        </div>
    )
}

export default Editor