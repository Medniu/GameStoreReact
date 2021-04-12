import React, { ReactElement } from "react";
import "./Alert.css";

interface IContainerProps {
  title: string;
  hasError: boolean;
  errorMessage: string;
  setActive: (active: boolean) => void;
}

const AcceptClick = (setActive: (active: boolean) => void) => {
  console.log("Clicked");
  setActive(false);
};

const Alert = ({ title, hasError, errorMessage, setActive }: IContainerProps): ReactElement => (
  <div className={`alert ${hasError ? "active" : ""}`}>
    <div className="alert-content">
      {title}
      <h1> {errorMessage} </h1>
      <button type="submit" onClick={() => AcceptClick(setActive)}>
        Click Here
      </button>
    </div>
  </div>
);
export default Alert;
