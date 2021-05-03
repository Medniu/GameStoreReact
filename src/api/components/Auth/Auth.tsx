import React, { ReactElement, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import InputText from "@/elements/inputText";
import { useDispatch, useSelector } from "react-redux";
import { User, AllState } from "@/types";
import Modal from "../Modal/Modal";
import "./Auth.css";
import cartIcon from "../../assets/images/Cart.png";

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
      axios
        .put("/auth/signUp", { login: email, password: formPassword })
        .then((response) => {
          const userProfile: User | null = response.data;
          if (userProfile) {
            dispatch({ type: "SIGN_IN", payload: userProfile });
            setRegisterModalIsOpen(false);
            history.push("/profile");
          }
        })
        .catch((err) => {
          setRegisterModalIsOpen(true);
          alert("User with this login already exists");
        });
    }
  };

  const signOut = () => {
    dispatch({ type: "SIGN_OUT" });
    history.push("/");
  };
  const closeLoginModal = () => {
    setLoginModalIsOpen(false);
    history.push("/");
  };

  const closeRegisterModal = () => {
    setRegisterModalIsOpen(false);
    history.push("/");
  };

  return !user ? (
    <>
      <div className="auth-link-container">
        <li className="auth">
          <button className="auth-button" type="button" onClick={() => setLoginModalIsOpen(true)}>
            Login
          </button>
        </li>
        <li className="auth">
          <button className="auth-button" type="button" onClick={() => setRegisterModalIsOpen(true)}>
            Register
          </button>
        </li>
      </div>

      <Modal open={loginModalIsOpen} onClose={closeLoginModal}>
        <div className="modal-body">
          <h2>
            Login and Get <span>Started</span>
          </h2>
          <form className="contact-form form-validate4">
            <div className="input-container">
              Email:
              <InputText value="" setInputField={setEmail} name="email" type="email" placeholder="email" />
            </div>
            <div className="input-container">
              Password:
              <InputText value="" setInputField={setPassword} name="password" type="password" placeholder="password" />
            </div>
            <div className="button-container">
              <button className="submit-button" type="button" onClick={() => onLoginClick()}>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal open={registerModalIsOpen} onClose={closeRegisterModal}>
        <div className="modal-body">
          <h2>
            Get Started Absolutely<span> Free!</span>
          </h2>
          <form className="contact-form">
            <div className="input-container">
              Email:
              <InputText value="" setInputField={setEmail} name="email" type="email" placeholder="email" />
            </div>
            <div className="input-container">
              Password:
              <InputText value="" setInputField={setPassword} name="password" type="password" placeholder="password" />
            </div>
            <div className="input-container">
              Confirm Password:
              <InputText
                value=""
                setInputField={setRepeatedPassword}
                name="password"
                type="password"
                placeholder="password"
              />
            </div>
            <div className="button-container">
              <button className="submit-button" type="button" onClick={() => onRegisterClick()}>
                Register
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  ) : (
    <div className="menu-right">
      <div className="cart-link-container">
        <Link className="cart-link" to="/cart">
          <img className="cart-img" src={cartIcon} alt="fireSpot" />
        </Link>
      </div>
      <div className="auth-link-container">
        <div className="auth">
          <Link className="profile-link" to="/profile">
            {user.login}
          </Link>
        </div>
        <div className="auth">
          <button className="auth-button" type="button" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
export default Auth;
