import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Auth from "../Auth/Auth";

function Header(): ReactElement {
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
            <Link className="cool-link" to="/products/All">
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
        <Auth />
      </ul>
    </nav>
  );
}

export default Header;
