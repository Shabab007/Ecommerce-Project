import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";

const StripeModal = ({ data, client }) => {
  const [payment, setPay] = useState(false);
  const makePayment = token => {
    const body = {
      token,
      product: data.cart.item,
      price: data.cart.totalPrice,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`http://localhost:5000/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then(response => {
        console.log(response);
        const { status } = response;
        console.log("STATUS", status);
        client.resetStore();
      })
      .catch(error => console.log(error));
  };
  console.log(process.env.REACT_APP_KEY);
  return payment ? (
    <h1>Your Order has been placed succesfully</h1>
  ) : (
    <StripeCheckout
      stripeKey="pk_test_51H1sYLGvsYapsm2yN1MYY70C41T7cZ6ZSGOOHHrdcDjRSS0mbInNP72w0umajfl2PsMv0KsBqV6QqkuvhmFhEOMG00KrALwe67"
      token={makePayment}
      name="Buy-react"
      amount={data.cart.totalPrice * 100}
    >
      <Button>Order Now</Button>
    </StripeCheckout>
  );
};

export default StripeModal;

const Button = styled.button`
  background: purple;
  border: none;
  width: 160px;
  height: 80px;
  color: white;
  text-align: center;
`;
