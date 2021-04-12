import React, { ReactElement } from "react";
import "./Alert.css";

interface ContainerProps {
  title: string;
  active: boolean;
  errorMsg: string;
  setActive: (active: boolean) => void;
}

const Alert = (props: ContainerProps): ReactElement => (
  <div className={props.active ? "alert active" : "alert"}>
    <div className="allert-content">
      {props.title}
      <h1> {props.errorMsg} </h1>
      <button
        type="submit"
        onClick={() => {
          console.log("Clicked");
          props.setActive(false);
        }}
      >
        Click Here
      </button>
    </div>
  </div>
);
export default Alert;
