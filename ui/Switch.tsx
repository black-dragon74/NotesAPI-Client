import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react"

type SwitchProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  iconLeft?: ReactNode
  iconRight?: ReactNode
  onChange?: () => void
}

const Switch: FC<SwitchProps> = ({ children: _ }) => {
  const [checked, setChecked] = useState(false)
  const bg = !checked ? "bg-primary-100" : "bg-primary-800"
  const dx = checked ? "translate-x-5" : ""

  return (
    <div className="">
      <label
        className={`relative flex justify-between items-center transition-colors duration-500 ease-linear align-middle w-7 h-5 rounded-20 px-2 m-0 cursor-pointer ${bg}`}
      >
        <input
          type="checkbox"
          checked={checked}
          className="absolute opacity-0 p-0 m-0"
          onChange={e => setChecked(e.target.checked)}
        />
        <p className="m-0 p-0">D</p>
        <p className="m-0 p-0">L</p>
        <div
          className={`absolute p-0 m-0 top-0 left-0 h-5 w-5 rounded-20 transform transition-transform ${dx}`}
          style={{ backgroundColor: "yellow" }}
        />
      </label>
    </div>
  )
}

export default Switch
