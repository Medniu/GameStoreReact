import { ReactElement, useState } from "react";
import { Route, useHistory } from "react-router-dom";
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
  const history = useHistory();
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

  const closeLoginModal = () => {
    setLoginModalIsOpen(false);
    history.push("/");
  };
  return (
    <>
      <Route path={path} component={pageComponent} />
      {!user && (
        <Modal open={loginModalIsOpen} onClose={closeLoginModal}>
          <div className="modal-body">
            <h2>
              Login and Get <span>Started</span>
            </h2>
            <form className="contact-form">
              <div className="input-container">
                <div>Email:</div>
                <InputText value={email} setInputField={setEmail} name="email" type="email" placeholder="email" />
              </div>
              <div className="input-container">
                <div>Password:</div>
                <InputText
                  value={formPassword}
                  setInputField={setPassword}
                  name="password"
                  type="password"
                  placeholder="password"
                />
              </div>
              <div className="button-container">
                <button className="submit-button" type="button" onClick={() => onLoginClick()}>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};
export default PrivateRoute;
