import { forwardRef } from "react"

const Input = forwardRef(function Input({ label , name, textarea , ...props}, ref) {

    let inputStyle = "form-control"

    if (props.className) {
        inputStyle += " " + props.className
    }

    let inputProps = {
        ...props,
        className : inputStyle
    }

    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {textarea && <textarea name={name} {...inputProps} ref={ref} ></textarea>}
            {!textarea && <input name={name} {...inputProps} ref={ref} />}
        </div>
    )
})

export default Input