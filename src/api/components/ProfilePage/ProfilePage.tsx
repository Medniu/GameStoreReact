import { ReactElement, useState } from "react";
import axios from "axios";
import InputText from "@/elements/inputText";
import Container from "../Container/Container";
import Modal from "../Modal/Modal";
import "./ProfilePage.css";

type User = {
  photo: string;
  login: string;
  address: string;
  phoneNumber: string;
};

interface ContainerProps {
  user: User | null;
  setUser: (active: User | null) => void;
}

function ProfilePage({ user, setUser }: ContainerProps): ReactElement {
  const [email, setEmail] = useState("");
  const [formPassword, setPassword] = useState("");
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(true);

  const onLoginClick = () => {
    if (email && formPassword) {
      axios.post("/auth/signIn", { login: email, password: formPassword }).then((response) => {
        const userProfile: User = response.data;
        setUser(userProfile);
      });
      setLoginModalIsOpen(false);
    } else {
      alert("Check input data and repeat");
    }
  };

  return (
    <>
      {user && (
        <div>
          <Container user={user} setUser={setUser}>
            <h1>Profile Page</h1>
          </Container>
        </div>
      )}
      {!user && (
        <Modal open={loginModalIsOpen} onClose={setLoginModalIsOpen}>
          <div className="modal-body">
            <h2>
              Login and Get <span>Started</span>
            </h2>
            <form className="contact-form form-validate4">
              <InputText setInputField={setEmail} name="email" type="email" placeholder="email" />
              <InputText setInputField={setPassword} name="password" type="password" placeholder="password" />
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
      )}
    </>
  );
}

export default ProfilePage;
