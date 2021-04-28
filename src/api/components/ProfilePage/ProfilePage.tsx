import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AllState, User } from "@/types";
import InputText from "@/elements/inputText";
import axios from "axios";
import Container from "../Container/Container";
import Modal from "../Modal/Modal";
import "./ProfilePage.css";

function ProfilePage(): ReactElement {
  const dispatch = useDispatch();
  const user = useSelector((state: AllState) => state.auth.user);
  const [address, setAddress] = useState(user?.address);
  const [phoneNumber, setphoneNumber] = useState(user?.phoneNumber);
  const [changePasswordModel, setChangePasswordModel] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmedPassword, setNewConfirmedPassword] = useState("");
  const history = useHistory();

  const signOut = () => {
    dispatch({ type: "SIGN_OUT" });
    history.push("/");
  };
  const updateContacts = () => {
    if (address && phoneNumber) {
      axios.post("/api/saveProfile", { login: user?.login, address, phoneNumber }).then(({ data }) => {
        const userProfile: User = data;
        dispatch({ type: "UPDATE_USER", payload: userProfile });
      });
    } else {
      alert("Check input data and try again");
    }
  };

  const openChangePasswordModal = () => {
    setChangePasswordModel(true);
  };

  const closePasswordModal = () => {
    setChangePasswordModel(false);
  };

  const updatePassword = () => {
    if (newPassword === newConfirmedPassword) {
      axios.post("/api/changePassword", { login: user?.login, newPassword, oldPassword }).then(({ data }) => {
        const responseMessage: boolean = data;
        if (responseMessage) {
          setChangePasswordModel(false);
          alert("Password changed successfully");
        } else {
          alert("Something go wrong try again");
        }
      });
    } else {
      alert("Check new and confirmed password and try again");
    }
  };
  return !user ? (
    <div>
      <Container>
        <h1>Profile Page</h1>
      </Container>
    </div>
  ) : (
    <>
      <Container>
        <div className="profile-container">
          <div className="photo-container">
            <img src={user.photo} alt="searchLogo" className="profile-image-container" />
          </div>
          <div className="user-container">
            <div>
              <h1>Login: {user.login}</h1>
            </div>
            <div className="user-info-container">
              Address:
              <InputText
                value={address || ""}
                type="text"
                placeholder="Address"
                name="address"
                setInputField={setAddress}
              />
            </div>
            <div className="user-info-container">
              PhoneNumber:
              <InputText
                value={phoneNumber || ""}
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                setInputField={setphoneNumber}
              />
            </div>
            <div className="buttons-container">
              <button type="button" onClick={() => updateContacts()}>
                Update contacts
              </button>
              <button type="button" onClick={() => openChangePasswordModal()}>
                Change password
              </button>
              <button type="button" onClick={() => signOut()}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Modal open={changePasswordModel} onClose={closePasswordModal}>
        <div className="modal-body">
          <form className="form-container">
            <h2>Changing password</h2>
            <div className="input-container">
              Input old password:
              <InputText
                value={oldPassword}
                setInputField={setOldPassword}
                name="password"
                type="password"
                placeholder="Old password"
              />
            </div>
            <div className="input-container">
              Input new password:
              <InputText
                value={newPassword}
                setInputField={setNewPassword}
                name="password"
                type="password"
                placeholder="New password"
              />
            </div>
            <div className="input-container">
              Confirmed new password:
              <InputText
                value={newConfirmedPassword}
                setInputField={setNewConfirmedPassword}
                name="password"
                type="password"
                placeholder="Confirm new password"
              />
            </div>
            <div className="button-container">
              <button className="submit-button" type="button" onClick={() => updatePassword()}>
                Confirm
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ProfilePage;
