import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react"
import Input from "../../ui/Input"
import { useField } from "formik"
import InputErrorMsg from "../../ui/InputErrorMsg"

type InputFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string
  altErrorMsg?: string
  errorMsg?: string
  label?: string
  textArea?: boolean
  rows?: number
}

const InputField: FC<InputFieldProps> = ({
  label,
  textArea,
  ref: _,
  errorMsg,
  className,
  ...props
}) => {
  const [field, meta] = useField(props)

  return (
    <div className={`h-full w-full ${className}`}>
      {label ? <div className="flex mb-2 text-primary-300">{label}</div> : null}
      <Input error={meta.error} textArea={textArea} {...field} {...props} />
      {meta.error && meta.touched ? (
        <div className="flex mt-1">
          <InputErrorMsg>{errorMsg || meta.error}</InputErrorMsg>
        </div>
      ) : null}
    </div>
  )
}

export default InputField
