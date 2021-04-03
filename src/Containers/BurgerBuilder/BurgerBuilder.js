import React, { Component } from "react";
import axiosInstance from "../../axios-orders";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from "../../Components/Burger/Burger";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Modal from "../../Components/UI/Modal/Modal";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.2,
  bacon: 0.8,
  meat: 1.5,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  handlePurchase = () => {
    this.setState({ purchasing: true });
  };

  handlePurchaseCancel = () => {
    this.setState({ purchasing: false });
  };

  handlePurchaseContinue = () => {
    // this.setState({ loading: true });

    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Prabhat Thapa",
    //     address: {
    //       street: "Test street",
    //       zipCode: "TW33JB",
    //       country: "UK",
    //     },
    //     email: "prabhat@test.com",
    //   },
    //   deliveryMethod: "fasted",
    // };

    // axiosInstance
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     console.log(`order response`, response);
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((error) => {
    //     console.log(`error`, error);
    //     this.setState({ loading: false, purchasing: false });
    //   });
    const queryParams = [];
    for (let key in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent(this.state.ingredients[key])
      );
    }

    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: `?${queryString}`,
    });
  };

  updateBurgerPurchaseableState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((sum, ingredientCount) => sum + ingredientCount, 0);

    this.setState({ purchaseable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updateBurgerPurchaseableState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updateBurgerPurchaseableState(updatedIngredients);
  };

  componentDidMount() {
    axiosInstance
      .get("/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? (
      <p>Error while fetching ingredients</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.handlePurchase}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.handlePurchaseCancel}
          purchaseContinued={this.handlePurchaseContinue}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.handlePurchaseCancel}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axiosInstance);
