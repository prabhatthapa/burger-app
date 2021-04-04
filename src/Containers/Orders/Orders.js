import React, { Component } from "react";
import axiosInstance from "../../axios-orders";
import Order from "../../Components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };

  componentDidMount() {
    axiosInstance
      .get("/orders.json")
      .then((res) => {
        console.log(`orders data`, res.data);
        const orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: orders });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axiosInstance);
