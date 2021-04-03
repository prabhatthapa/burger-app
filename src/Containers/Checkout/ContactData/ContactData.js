import { Component } from "react";

import axiosInstance from "../../../axios-orders";
import Button from "../../../Components/UI/Button/Button";
import Spinner from "../../../Components/UI/Spinner/Spinner";

import "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
    totalPrice: 0,
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Prabhat Thapa",
        address: {
          street: "Test street",
          zipCode: "TW33JB",
          country: "UK",
        },
        email: "prabhat@test.com",
      },
      deliveryMethod: "fasted",
    };

    axiosInstance
      .post("/orders.json", order)
      .then((response) => {
        console.log(`order response`, response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(`error`, error);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className="Input"
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className="Input"
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className="Input"
          type="text"
          name="street"
          placeholder="Your street"
        />
        <input
          className="Input"
          type="text"
          name="postal"
          placeholder="Your postal code"
        />
        <Button buttonType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className="ContactData">
        <h1>Enter your contact data</h1>
        {form}
      </div>
    );
  }
}

export default ContactData;
