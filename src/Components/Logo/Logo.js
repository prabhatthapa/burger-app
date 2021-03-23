import React from "react";

import burgerLogo from "../../Assets/images/burger-logo.png";

import "./Logo.css";

const logo = (props) => (
  <div className={["Logo", props.customClass].join(" ")}>
    <img src={burgerLogo} alt="City Burger" />
  </div>
);

export default logo;
