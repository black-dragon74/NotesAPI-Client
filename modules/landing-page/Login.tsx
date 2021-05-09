import { useEffect } from "react"
import { useRouter } from "next/router"
import { useTokenStore } from "../auth/useTokenStore"
import { Card } from "@material-ui/core/"
import styles from "../../styles/SCSS/Login.module.scss"

export const LoginPage = () => {
  const hasTokens = useTokenStore(
    (state) => state.accessToken && state.refreshToken
  )
  const { push } = useRouter()

  useEffect(() => {
    if (hasTokens) {
      push("/dash")
    }
  }, [hasTokens, push])

  return (
    <div className={styles.root}>
      <Card variant="elevation" elevation={2} className={styles.card}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. In sint ipsum
        maxime reprehenderit ratione id necessitatibus
      </Card>
    </div>
  )
}
