import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { AllState } from "@/types";
import Container from "../Container/Container";
import "./ProfilePage.css";

function ProfilePage(): ReactElement {
  const user = useSelector((state: AllState) => state.auth.user);

  return !user ? (
    <div>
      <Container>
        <h1>Profile Page</h1>
      </Container>
    </div>
  ) : (
    <Container>
      <div>{user.login}</div>
      <div>{user.address}</div>
      <div>{user.phoneNumber}</div>
      <div>{user.photo}</div>
    </Container>
  );
}

export default ProfilePage;
