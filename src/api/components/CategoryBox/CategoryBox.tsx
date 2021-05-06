import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./CategoryBox.css";

interface Props {
  link: string;
  categoryName: string;
}
function CategoryBox({ link, categoryName }: Props): ReactElement {
  return (
    <Link to={link}>
      <div className="category-box-container">{categoryName}</div>
    </Link>
  );
}

export default React.memo(CategoryBox);
