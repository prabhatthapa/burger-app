import { Component } from "react";

import axiosInstance from "../../../axios-orders";
import Button from "../../../Components/UI/Button/Button";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";

import "./ContactData.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
    totalPrice: 0,
  };

  checkValidity(value, rules) {
    let isValid = false;
    console.log(rules);
    if (!rules) {
      console.log("return true");
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "";
    }

    return isValid;
  }

  orderHandler = (event) => {
    console.log(this.props);
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};

    for (let inputIdentifer in this.state.orderForm) {
      formData[inputIdentifer] = this.state.orderForm[inputIdentifer].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    };

    console.log(order);
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

  inputChangedHandler = (event, inputIdentifer) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifer] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifer] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifer in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifer].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button buttonType="Success" disabled={!this.state.formIsValid}>
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
