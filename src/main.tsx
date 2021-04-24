import React, { useState } from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./api/components/App";
import UserContext from "./api/components/context";

type User = {
  photo: string;
  login: string;
  address: string;
  phoneNumber: string;
};

function Main() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <App />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

ReactDom.render(<Main />, document.getElementById("app"));
