import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header(): ReactElement {
  return (
    <nav>
      <ul className="menu-ul">
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
          <Link className="cool-link" to="/Login">
            Login
          </Link>
        </li>
        <li>
          <Link className="cool-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
