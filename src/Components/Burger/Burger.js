import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import "./Burger.css";

const burger = (props) => {
  let transformdIngredients = Object.keys(props.ingredients)
    .map((ingredientKey) => {
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return (
          <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        );
      });
    })
    .reduce((array, currentValue) => {
      return array.concat(currentValue);
    }, []);

  if (transformdIngredients.length === 0) {
    transformdIngredients = <p>Please start adding ingredients</p>;
  }
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformdIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
