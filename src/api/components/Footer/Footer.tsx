import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import rockstarLogo from "../../assets/images/rockstar.png";
import ubisoftLogo from "../../assets/images/ubisoft.png";
import valveLogo from "../../assets/images/steam.png";
import "./Footer.css";

function Footer(): ReactElement {
  return (
    <div className="footer">
      <h2>Incredible convenient</h2>
      <ul>
        <li>
          <Link to="//www.valvesoftware.com/" target="_blanc" rel="noopener noreferrer">
            <img src={valveLogo} alt="fireSpot" />
          </Link>
        </li>
        <li>
          <Link to="//www.rockstargames.com/" target="_blanc" rel="noopener noreferrer">
            <img src={rockstarLogo} alt="fireSpot" />
          </Link>
        </li>
        <li>
          <Link to="//www.ubisoft.com/" target="_blanc" rel="noopener noreferrer">
            <img src={ubisoftLogo} alt="fireSpot" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default React.memo(Footer);
