import { forwardRef, ComponentPropsWithoutRef } from "react"

type InputProps = ComponentPropsWithoutRef<"input"> & {
  textArea?: boolean
  rows?: number
  error?: string
  transparent?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, textArea, error, transparent, ...props }, ref) => {
    const bg = transparent ? "bg-transparent" : "bg-primary-700"
    const ring = error ? "ring-1 ring-secondary" : ""
    const fullClassNames = `w-full px-4 py-2 rounded-8 text-primary-100 placeholder-primary-100 focus:outline-none ${bg} ${ring}`
    return textArea ? (
      <textarea
        ref={ref as any}
        className={fullClassNames}
        {...(props as any)}
      />
    ) : (
      <input ref={ref} className={fullClassNames} {...props} />
    )
  }
)

Input.displayName = "Input"

export default Input
