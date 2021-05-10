import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react"
import Spinner from "./Spinner"

const sizeClassNames = {
  big: "py-2 px-6 text-sm rounded-lg",
  small: "px-2 py-1 text-sm rounded-md",
  tiny: "px-1 text-sm rounded-5",
}

const colorClassNames = {
  primary:
    "text-button bg-accent transition duration-200 ease-in-out hover:bg-accent-color disabled:text-accent-disabled disabled:bg-accent-hover",
  secondary:
    "text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300",
  "secondary-800":
    "text-button bg-primary-800 hover:bg-primary-600 disabled:text-primary-300",
  "primary-300":
    "text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300",
  transparent: "text-button bg-transparent",
  "accent-secondary":
    "text-button bg-secondary hover:bg-secondary-washed-out disabled:text-secondary-washed-out",
}

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassNames
  color?: keyof typeof colorClassNames
  icon?: ReactNode
  loading?: boolean
  transition?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  size = "big",
  color = "primary",
  disabled,
  icon,
  loading,
  className = "",
  transition,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`flex outline-none focus:ring-4 focus:ring-${color} ${
        sizeClassNames[size]
      } ${transition ? `transition duration-200 ease-in-out` : ``} ${
        colorClassNames[color]
      } font-bold items-center justify-center ${className}`}
      {...props}
    >
      <span className={loading ? `opacity-0` : `flex items-center`}>
        {icon ? <span className="mr-2 items-center">{icon}</span> : null}
        {children}
      </span>
      {loading && (
        <span className="absolute">
          <Spinner size={size === "small" ? "2" : "4"} />
        </span>
      )}
    </button>
  )
}

export default Button
