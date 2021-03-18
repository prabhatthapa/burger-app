import React, { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import Aux from "../../hoc/Aux";

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>Build Controller</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
