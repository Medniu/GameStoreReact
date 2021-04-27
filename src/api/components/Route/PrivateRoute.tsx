import { ReactElement, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AllState, User } from "@/types";
import InputText from "../../../elements/inputText";
import Modal from "../Modal/Modal";

interface Props {
  pageComponent: any;
  path: string;
}
const PrivateRoute = ({ pageComponent, path }: Props): ReactElement => {
  const [email, setEmail] = useState("");
  const [formPassword, setPassword] = useState("");
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state: AllState) => state.auth.user);

  const onLoginClick = () => {
    if (email && formPassword) {
      axios.post("/auth/signIn", { login: email, password: formPassword }).then((response) => {
        const userProfile: User = response.data;
        dispatch({ type: "SIGN_IN", payload: userProfile });
      });
      setLoginModalIsOpen(false);
    } else {
      alert("Check input data and repeat");
    }
  };
  return (
    <>
      <Route path={path} component={pageComponent} />
      {!user && (
        <Modal open={loginModalIsOpen} onClose={setLoginModalIsOpen}>
          <div className="modal-body">
            <h2>
              Login and Get <span>Started</span>
            </h2>
            <form className="contact-form">
              <div className="input-container">
                Email:
                <InputText value={email} setInputField={setEmail} name="email" type="email" placeholder="email" />
              </div>
              <div className="input-container">
                <InputText
                  value={formPassword}
                  setInputField={setPassword}
                  name="password"
                  type="password"
                  placeholder="password"
                />
              </div>
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
};
export default PrivateRoute;
