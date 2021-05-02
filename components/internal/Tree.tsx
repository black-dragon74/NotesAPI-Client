import styles from "./Tree.module.scss"
import {useState} from "react";

const Tree = () => {
    return (
        <></>
    )
}

const Node = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <li>
                <div onClick={e => setOpen(o => !o)}>
                </div>
            </li>
        </>
    )
}

export default Tree