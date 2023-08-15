import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import StripeModal from "../stripeCheckout/StripeModal";
import { ApolloConsumer } from "@apollo/react-hooks";

const Order = ({ data }) => {
  Modal.setAppElement("#root");
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleClick = () => {
    setModal(true);
    setOpen(true);
  };
  console.log("BYEEEEEEEEEE");

  return (
    <ApolloConsumer>
      {client => (
        <>
          {user ? (
            <StripeModal client={client} data={data} />
          ) : modal ? (
            <Modalwrap
              isOpen={open}
              style={{ overlay: { backgroundColor: "grey" } }}
            >
              <button
                onClick={() => {
                  setOpen(false);
                  setModal(false);
                }}
              >
                Close
              </button>
              <Link to="/login">
                <h1>LOGIN</h1>
              </Link>
              <p>or</p>
              <Link to="/signup">
                <h1>SIGN UP</h1>
              </Link>
            </Modalwrap>
          ) : (
            <Button onClick={handleClick}>Order Now</Button>
          )}
        </>
      )}
    </ApolloConsumer>
  );
};

export default Order;

const Button = styled.button`
  background: purple;
  border: none;
  width: 160px;
  height: 80px;
  color: white;
  text-align: center;
`;

const Modalwrap = styled(Modal)`
  width: 600px;
  height: 400px;
  color: black;
  background: white;
  margin: 30vh auto;
  border: none;
  outline: none;
  text-align: center;
  h1 {
    padding: 60px;
  }
`;
