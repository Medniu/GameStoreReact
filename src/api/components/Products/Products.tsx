import { ReactElement } from "react";
import Container from "../Container/Container";

function Products(): ReactElement {
  return (
    <div>
      <Container>
        <ul>
          <li>
            <h1>Game1</h1>
          </li>
          <li>
            <h1>Game2</h1>
          </li>
          <li>
            <h1>Game3</h1>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Products;
