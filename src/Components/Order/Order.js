import React from "react";

import "./Order.css";

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      quantity: props.ingredients[ingredientName],
    });
  }

  const ingredientsList = ingredients.map((ingredient) => (
    <span
      key={ingredient.name}
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px",
      }}
    >
      {ingredient.name} ({ingredient.quantity})
    </span>
  ));

  return (
    <div className="Order">
      <p>Ingredients: {ingredientsList}</p>
      <p>
        Price <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
