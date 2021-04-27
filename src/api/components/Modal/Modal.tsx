import React, { ReactElement, ReactNode } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import "../Auth/Auth.css";

const modalPortal = document.getElementById("modal")!;

interface ContainerProps {
  children: ReactNode;
  open: boolean;
  onClose: (active: boolean) => void;
}

function Modal(props: ContainerProps): ReactElement | null {
  const { children, open, onClose } = props;
  return ReactDOM.createPortal(
    <>
      {open && (
        <div className="modal" onClick={() => onClose()}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>,
    modalPortal
  );
}
export default Modal;
