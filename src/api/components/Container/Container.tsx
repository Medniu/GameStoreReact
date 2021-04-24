import { ReactElement, ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps): ReactElement {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Container;
