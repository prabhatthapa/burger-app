import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((ingredientKey) => {
    return (
      <li key={ingredientKey}>
        <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>:
        {props.ingredients[ingredientKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <p> A delicious burger with the following ingredients</p>
      <ul>{ingredients}</ul>
      <span>Continue to checkout?</span>
      <Button buttonType="Danger" clicked={props.purchaseCancelled}>
        Cancel
      </Button>
      <Button buttonType="Success" clicked={props.purchaseContinued}>
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
