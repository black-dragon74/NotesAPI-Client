import HeaderController from "../modules/display/HeaderController"
import DesktopLayout from "../modules/layouts/DesktopLayout"
import { MiddlePanel } from "../modules/layouts/GridPanels"
import DashHeader from "../ui/DashHeader"
import NoteCard from "../ui/NoteCard"

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
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map(n => (
            <NoteCard
              key={n}
              title="Henlo"
              excerpt="So this is really just a demo of the note and I hab no fucki'n idea what to do with it. Also, never try TS with React. You'll be fixing more than you would be creating."
              onClick={() => console.log("Click kar diya gays!")}
            />
          ))}
        </div>
      </MiddlePanel>
    </DesktopLayout>
  )
}
export default Dash
