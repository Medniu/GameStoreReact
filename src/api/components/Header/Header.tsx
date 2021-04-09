import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

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
            <Link className="cool-link" to="/products">
              Products
            </Link>
          </li>
          <li>
            <Link className="cool-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="dropdown" to="#0">
              Categories
            </Link>
            <ul className="sub-menu">
              <li>
                <Link to="#0">Ps</Link>
              </li>
              <li>
                <Link to="#0">XBox</Link>
              </li>
              <li>
                <Link to="#0">PC</Link>
              </li>
            </ul>
          </li>
        </div>
        <div className="menu-right">
          <li className="auth">
            <Link className="cool-link" to="/Login">
              Login
            </Link>
          </li>
          <li className="auth">
            <Link className="cool-link" to="/register">
              Register
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Header;
