import {useCallback, useState} from 'react'
import styles from '../styles/SideBar.module.scss'
import Tree from "./internal/Tree"

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(elem => {
        console.log(elem.current)
    }, [])

    return (
        <div className={styles.sideBar}>
            {/* The header which has welcome and shiz */}
            <div className={styles.sideBarHeader}>
                <p>Hello, Nick!</p>
                <div className={styles.buttonContainer}>
                    <div>NF</div>
                    <div>NN</div>
                    <div>LO</div>
                </div>
            </div>

            {/* The separator */}
            <hr color="gray"/>

            {/* The data tree */}
            <Tree />
        </div>
    );
};

export default SideBar