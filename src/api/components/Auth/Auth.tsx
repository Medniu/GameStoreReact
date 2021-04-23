import React, { ReactElement, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import InputText from "@/elements/inputText";
import Modal from "../Modal/Modal";
import "./Auth.css";

interface ContainerProps {
  user: User | null;
  setUser: (active: User | null) => void;
}

type User = {
  photo: string;
  name: string;
  address: string;
  phoneNumber: string;
};

function Auth({ user, setUser }: ContainerProps): ReactElement {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const history = useHistory();

  const onLoginClick = () => {
    console.log("Clicked");
    axios.post("/auth/signIn").then((response) => {
      const userProfile: User = response.data;
      setUser(userProfile);
    });
    setLoginModalIsOpen(false);
  };

  const onRegisterClick = () => {
    console.log("Clicked");
    axios.put("/auth/signUp").then((response) => {
      const userProfile: User = response.data;
      setUser(userProfile);
    });
    setRegisterModalIsOpen(false);
    history.push("/profile");
  };

  const signOut = () => {
    setUser(null);
    history.push("/");
  };

  return !user ? (
    <>
      <div className="menu-right">
        <li className="auth">
          <button type="button" onClick={() => setLoginModalIsOpen(true)}>
            Login
          </button>
        </li>
        <li className="auth">
          <button type="button" onClick={() => setRegisterModalIsOpen(true)}>
            Register
          </button>
        </li>
      </div>

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

      <Modal open={registerModalIsOpen} onClose={setRegisterModalIsOpen}>
        <div className="modal-body">
          <h2>
            Get Started Absolutely<span> Free!</span>
          </h2>
          <form className="contact-form">
            <InputText name="email" type="email" placeholder="email" />
            <InputText name="password" type="password" placeholder="password" />
            <InputText name="password" type="password" placeholder="password" />
            <button className="submit-button" type="button" onClick={() => onRegisterClick()}>
              Register
            </button>
          </form>
        </div>
      </Modal>
    </>
  ) : (
    <div className="menu-right">
      <li className="auth">
        <Link className="profile-link" to="/profile">
          {user.name}
        </Link>
      </li>
      <li className="auth">
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </li>
    </div>
  );
}
export default Auth;
