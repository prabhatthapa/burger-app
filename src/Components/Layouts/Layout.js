import React from "react";

import Aux from "../../hoc/Aux";
import "./Layout.css";

const layout = (props) => (
  <aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className="content">{props.children}</main>
  </aux>
);

export default layout;
