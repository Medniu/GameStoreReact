import React, { ReactElement } from "react";
import "./RadioButton.css";

interface ContainerProps {
  name: string;
  currentValue: string;
  optionalList: Array<string>;
  changeFilterValue: (active: string) => void;
}

const RadioButtonForm = ({ name, currentValue, optionalList, changeFilterValue }: ContainerProps): ReactElement => (
  <>
    <h2>{name}:</h2>
    <div className="criteria-container">
      <form className="radio-button-container">
        {optionalList.map((value) => (
          <div key={value} className="button-container">
            <div>
              <input
                type="radio"
                value={value}
                checked={currentValue === value}
                onChange={(event) => changeFilterValue(event.target.value)}
              />
            </div>
            {value !== "All" && name !== "Genres" ? <div>{value}+</div> : <div>{value}</div>}
          </div>
        ))}
      </form>
    </div>
  </>
);
export default RadioButtonForm;
