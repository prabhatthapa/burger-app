import axiosInstance from "../../axios-orders";
import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axiosInstance
      .post("/orders.json", orderData)
      .then((response) => {
        console.log(`order response`, response);
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch((error) => {
        console.log(`error`, error);
        dispatch(purchaseBurgerFail(error));
      });
  };
};
