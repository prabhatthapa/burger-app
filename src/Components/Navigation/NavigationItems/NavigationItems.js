import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import "./NavigationItems.css";

const navigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem active>Burger Builder</NavigationItem>
    <NavigationItem>Checkout</NavigationItem>
  </ul>
);

export default navigationItems;
