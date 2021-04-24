import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Auth from "../Auth/Auth";

interface ContainerProps {
  user: User | null;
  setUser: (active: User | null) => void;
}

type User = {
  photo: string;
  login: string;
  address: string;
  phoneNumber: string;
};

function Header({ user, setUser }: ContainerProps): ReactElement {
  return (
    <nav>
      <ul className="menu-ul">
        <div className="menu-left">
          <li>
            <Link className="cool-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="cool-link" to="/products/all">
              Products
            </Link>
            <ul className="sub-menu">
              <li>
                <Link to="/products/Ps">Ps</Link>
              </li>
              <li>
                <Link to="/products/Xbox">Xbox</Link>
              </li>
              <li>
                <Link to="/products/Pc">PC</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="cool-link" to="/about">
              About
            </Link>
          </li>
        </div>
        <Auth user={user} setUser={setUser} />
      </ul>
    </nav>
  );
}

export default Header;
