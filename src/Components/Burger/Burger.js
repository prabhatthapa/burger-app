import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import "./Burger.css";

const burger = (props) => {
  const transformdIngredients = Object.keys(props.ingredients).map(
    (ingredientKey) => {
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return (
          <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        );
      });
    }
  );
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformdIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
