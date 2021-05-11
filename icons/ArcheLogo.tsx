import { ImgHTMLAttributes } from "react"

export default function ArcheLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src="/static/archelogo.png" width={170} height={45} {...props} />
}
