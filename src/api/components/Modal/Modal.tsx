import React, { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import "./Modal.css";
import "../Auth/Auth.css";

const modalPortal = document.getElementById("modal");

interface ContainerProps {
  children: ReactNode;
  open: boolean;
  onClose: (active: boolean) => void;
}

function Modal(props: ContainerProps) {
  const { children, open, onClose } = props;
  const history = useHistory();
  const onCloseModal = () => {
    onClose(false);
    history.push("/");
  };
  if (!open) return null;

  return modalPortal
    ? ReactDOM.createPortal(
      // <div className="modal" onClick={() => onClose(false)}>
      <div className="modal" onClick={() => onCloseModal()}>
        <div className="modal_content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>,
      modalPortal
    )
    : null;
}
export default Modal;
