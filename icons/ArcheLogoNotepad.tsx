import { ImgHTMLAttributes } from "react"

export default function ArcheLogoNotepad(
  props: ImgHTMLAttributes<HTMLImageElement>
) {
  return (
    <img src="/static/archelogo-sm.png" width={154} height={150} {...props} />
  )
}
