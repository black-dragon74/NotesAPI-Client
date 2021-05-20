import NotesListController from "../modules/dashboard/NotesListController"
import HeaderController from "../modules/display/HeaderController"
import DesktopLayout from "../modules/layouts/DesktopLayout"
import { MiddlePanel } from "../modules/layouts/GridPanels"
import DashHeader from "../ui/DashHeader"

const Dash = () => {
  return (
    <DesktopLayout>
      <HeaderController title="Dashboard"></HeaderController>
      <MiddlePanel
        stickyChildren={
          <DashHeader
            title="Your Notes"
            ctaTitle="New Note"
            onCtaClicked={() => console.log("Ah yes, climck")}
          />
        }
      >
        <NotesListController />
      </MiddlePanel>
    </DesktopLayout>
  )
}
export default Dash
