

export default function Button({ id = null, children, style, ...props }) {

    // console.log(props.onClick);

    let buttonStyle = "btn"

    const additonalProps = Object.keys(props).filter(k => k != "className")

    switch (style) {
        case "dark":
            buttonStyle += " btn-dark"
            break;

        case "light":
            buttonStyle += " btn-light"
            break;

        case "danger":
            buttonStyle += " btn-danger"
            break;

        case "outline-dark":
            buttonStyle += " btn-outline-dark"
            break;

        case "outline-light":
            buttonStyle += " btn-outline-light"
            break;

        case "outline-danger":
            buttonStyle += " btn-outline-danger"
            break;

        default:
            buttonStyle += " btn"
    }


    if (props.className) {
        buttonStyle += (" " + props.className)
    }

    let allProps = {
        ...props,
        className: buttonStyle
    }

    return (
        <button {...allProps}>
            {children}
        </button>
    )
}