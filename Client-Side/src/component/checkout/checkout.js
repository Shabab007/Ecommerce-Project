import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_CART } from "../../Queries/query";
import styled from "styled-components";
import Increment from "./increment/increment";
import { useMutation } from "@apollo/react-hooks";
import { DEL_CART } from "../../Queries/mutaion";
import Order from "./orderButton/order";

const Checkout = () => {
  const [delItem] = useMutation(DEL_CART);
  const { loading, error, data } = useQuery(GET_CART);
  if (data) {
    console.log(data);
  }
  console.log("HIIIIIIIIIIIIIIIIIIIIII");
  const handleRemove = id => {
    delItem({
      variables: {
        id: id,
      },
    });
  };

  return (
    <div>
      {loading ? (
        <h1>Loading.....</h1>
      ) : error ? (
        <h1>Error...</h1>
      ) : data && data.cart.item.length ? (
        <Grid>
          <h1>Cart Items</h1>
          {data.cart.item.map(item => {
            return (
              <Border key={item.id}>
                <p>name:{item.name}</p>
                <p>price:${item.price}</p>
                <Increment counter={item.qty} id={item.id} />
                <p>Brand:{item.brand}</p>
                <p>{item.qty * parseInt(item.price)}</p>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </Border>
            );
          })}
          <Total>
            <p>Total Price:${data.cart.totalPrice}</p>
          </Total>
          <Order data={data} />
        </Grid>
      ) : (
        <h1>Empty Cart</h1>
      )}
    </div>
  );
};

export default Checkout;

const Border = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(6, 1fr);

  border-top: 1px solid grey;
`;
const Total = styled.div`
  border-top: 1px solid grey;
`;
const Grid = styled.div`
  display: grid;
`;
