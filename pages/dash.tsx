import HeaderController from "../modules/display/HeaderController"
import DesktopLayout from "../modules/layouts/DesktopLayout"
import { MiddlePanel } from "../modules/layouts/GridPanels"
import NoteCard from "../ui/NoteCard"

const Dash = () => {
  return (
    <DesktopLayout>
      <HeaderController title="Dashboard"></HeaderController>
      <MiddlePanel>
        <NoteCard title="Henlo" />
      </MiddlePanel>
    </DesktopLayout>
  )
}
export default Dash
