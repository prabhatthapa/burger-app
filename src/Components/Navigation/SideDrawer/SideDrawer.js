import React from "react";
import Aux from "../../../hoc/Aux";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import "./SideDrawer.css";

const sideDrawer = (props) => {
  let attachedClasses = ["SideDrawer"];
  if (props.open) {
    attachedClasses.push("Open");
  } else {
    attachedClasses.push("Close");
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <Logo />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
