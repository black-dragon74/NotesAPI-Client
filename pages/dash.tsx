import HeaderController from "../modules/display/HeaderController"
import DesktopLayout from "../modules/layouts/DesktopLayout"
import { MainGrid } from "../ui/MainGrid"

const Dash = () => {
  return (
    <DesktopLayout>
      <HeaderController title="Dashboard"></HeaderController>
      <div className="flex justify-center">
        <h1 className="text-button">Henlo Gays!</h1>
      </div>
    </DesktopLayout>
  )
}
export default Dash
