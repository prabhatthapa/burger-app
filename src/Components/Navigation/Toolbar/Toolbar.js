import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import "./Toolbar.css";

const toolbar = (props) => (
  <header className="Toolbar">
    <div>Menu</div>
    <Logo />
    <nav className="DesktopOnly">
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
