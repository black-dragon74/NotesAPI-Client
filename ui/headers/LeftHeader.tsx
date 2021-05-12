import Link from "next/link"
import useScreenType, { ScreenType } from "../../hooks/useScreenType"
import ArcheLogo from "../../icons/ArcheLogo"
import ArcheLogoNotepad from "../../icons/ArcheLogoNotepad"

const LeftHeader = () => {
  const screenType = useScreenType()
  return (
    <Link href="/dash">
      <a className="w-full">
        {screenType === ScreenType.ThreeCol ? (
          <ArcheLogo width={168} height={40} />
        ) : (
          <div className="flex justify-center w-full">
            <ArcheLogoNotepad width={40} height={40} />
          </div>
        )}
      </a>
    </Link>
  )
}

export default LeftHeader
