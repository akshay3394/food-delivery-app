import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"


const Modal = forwardRef(function Modal({ children, ...props }, ref) {
    const modalRef = useRef()

    useImperativeHandle(ref, () => {
        return {
            openModel() {
                modalRef.current.showModal()
            },

            closeModel() {
                modalRef.current.close()
            }
        }
    })


    return createPortal(
        <dialog ref={modalRef} className="border rounded shadow-lg w-50 py-2" {...props}>
            {children}
        </dialog>,
        document.getElementById("modal-box")
    )
})

export default Modal