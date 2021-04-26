import React, { ReactElement, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import InputText from "@/elements/inputText";
import { useDispatch, useSelector } from "react-redux";
import { User, AllState } from "@/types";
import Modal from "../Modal/Modal";
import "./Auth.css";

function Auth(): ReactElement {
  const [email, setEmail] = useState("");
  const [formPassword, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  const user = useSelector((state: AllState) => state.auth.user);

  const onLoginClick = () => {
    if (email && formPassword) {
      axios.post("/auth/signIn", { login: email, password: formPassword }).then(({ data }) => {
        const userProfile: User = data;
        dispatch({ type: "SIGN_IN", payload: userProfile });
      });
      setLoginModalIsOpen(false);
    } else {
      alert("Check input data and repeat");
    }
  };

  const onRegisterClick = () => {
    if (email && formPassword && formPassword === repeatedPassword) {
      axios.put("/auth/signUp", { login: email, password: formPassword }).then((response) => {
        const userProfile: User = response.data;
        dispatch({ type: "SIGN_IN", payload: userProfile });
      });
      setRegisterModalIsOpen(false);
      history.push("/profile");
    }
  };

  const signOut = () => {
    dispatch({ type: "SIGN_OUT" });
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

      <Modal open={registerModalIsOpen} onClose={setRegisterModalIsOpen}>
        <div className="modal-body">
          <h2>
            Get Started Absolutely<span> Free!</span>
          </h2>
          <form className="contact-form">
            <InputText setInputField={setEmail} name="email" type="email" placeholder="email" />
            <InputText setInputField={setPassword} name="password" type="password" placeholder="password" />
            <InputText setInputField={setRepeatedPassword} name="password" type="password" placeholder="password" />
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
          {user.login}
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
