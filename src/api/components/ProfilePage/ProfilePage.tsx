import { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import InputText from "@/elements/inputText";
import Container from "../Container/Container";
import Modal from "../Modal/Modal";
import "./ProfilePage.css";

type User = {
  photo: string;
  name: string;
  address: string;
  phoneNumber: string;
};

interface ContainerProps {
  user: User | null;
  setUser: (active: User | null) => void;
}

function ProfilePage({ user, setUser }: ContainerProps): ReactElement {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(true);

  const history = useHistory();

  const onLoginClick = () => {
    console.log("Clicked");
    axios.post("/auth/signIn").then((response) => {
      const userProfile: User = response.data;
      setUser(userProfile);
    });
    setLoginModalIsOpen(false);
    history.push("/profile");
  };

  if (!user && loginModalIsOpen === true) {
    return (
      <Modal open={loginModalIsOpen} onClose={setLoginModalIsOpen}>
        <div className="modal-body">
          <h2>
            Login and Get <span>Started</span>
          </h2>
          <form className="contact-form form-validate4">
            <InputText name="email" type="email" placeholder="email" />
            <InputText name="password" type="password" placeholder="password" />
            <input
              className="submit-button"
              id="login_btn"
              type="button"
              value="Sign In"
              onClick={() => onLoginClick()}
            />
          </form>
        </div>
      </Modal>
    );
  }
  return (
    <div>
      <Container user={user} setUser={setUser}>
        <h1>Profile Page</h1>
      </Container>
    </div>
  );
}

export default ProfilePage;
