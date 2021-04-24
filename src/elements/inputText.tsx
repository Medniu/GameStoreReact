import React, { ReactElement, useState } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  setInputField: (active: string) => void;
}

function inputText({ name, placeholder, type, setInputField }: InputProps): ReactElement {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onEmailInput = (inputEmail: string) => {
    if (!inputEmail.includes("@")) {
      setEmailError("invalid email, should contain at least @");
    } else {
      setEmailError("");
      setInputField(inputEmail);
    }
  };
  const onPasswordInput = (inputPassword: string) => {
    let passError = "";
    if (!inputPassword) {
      passError = "Password cannot be empty";
    }
    if (inputPassword.length < 6) {
      passError += " Password should more than 6 characters";
    }
    if (passError) {
      setPasswordError(passError);
    } else {
      setPasswordError("");
      setInputField(inputPassword);
    }
  };

  if (type === "email") {
    return (
      <div className="form-group">
        <input
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          onChange={(event) => onEmailInput(event.target.value)}
        />
        <div style={{ fontSize: 12, color: "red" }}>{emailError}</div>
      </div>
    );
  }
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
        onChange={(event) => onPasswordInput(event.target.value)}
      />
      <div style={{ fontSize: 12, color: "red" }}>{passwordError}</div>
    </div>
  );
}
export default inputText;
