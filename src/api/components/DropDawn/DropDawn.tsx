import React, { ReactElement } from "react";
import "./DropDawn.css";

interface ContainerProps {
  dropDawnName: string;
  currentValue: string;
  optionalList: Array<string>;
  changeSortType: (active: string) => void;
}

const DropDawn = ({ dropDawnName, currentValue, optionalList, changeSortType }: ContainerProps): ReactElement => (
  <>
    <div>{dropDawnName}</div>
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
export default DropDawn;
