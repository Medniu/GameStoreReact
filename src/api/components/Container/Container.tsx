import { ReactElement, ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface ContainerProps {
  children: ReactNode;
  user: User | null;
  setUser: (active: User | null) => void;
}

type User = {
  photo: string;
  name: string;
  address: string;
  phoneNumber: string;
};

function Container({ children, user, setUser }: ContainerProps): ReactElement {
  return (
    <div>
      <Header user={user} setUser={setUser} />
      {children}
      <Footer />
    </div>
  );
}

export default Container;
