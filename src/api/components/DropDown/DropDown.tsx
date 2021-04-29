import React, { ReactElement } from "react";
import "./DropDown.css";

interface ContainerProps {
  dropDownName: string;
  currentValue: string;
  optionalList: Array<string>;
  changeSortType: (active: string) => void;
}

const DropDown = ({ dropDownName, currentValue, optionalList, changeSortType }: ContainerProps): ReactElement => (
  <>
    <div>{dropDownName}</div>
    <div>
      <select value={currentValue} onChange={(event) => changeSortType(event.target.value)}>
        {optionalList.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  </>
);
export default DropDown;
