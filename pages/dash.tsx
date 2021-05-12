import HeaderController from "../modules/display/HeaderController"
import DesktopLayout from "../modules/layouts/DesktopLayout"
import { MiddlePanel } from "../modules/layouts/GridPanels"
import NoteCard from "../ui/NoteCard"

const Dash = () => {
  return (
    <DesktopLayout>
      <HeaderController title="Dashboard"></HeaderController>
      <MiddlePanel>
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
