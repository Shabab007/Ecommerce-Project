import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { COUNT_PROD } from "../../../Queries/mutaion";

const Increment = ({ counter, id }) => {
  const [count, setCount] = useState(counter);
  const [disable, setDisable] = useState(false);
  const [countProd] = useMutation(COUNT_PROD);

  const increment = () => {
    if (count >= 1) {
      setDisable(false);
    }
    setCount(count => count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count => count - 1);
    } else {
      setDisable(disable => true);
    }
  };
  console.log(disable, "Hi", count);
  useEffect(() => {
    console.log(count);
    countProd({ variables: { id: id, qty: count } });
  }, [count]);
  return (
    <Grid>
      <Button disabled={disable} onClick={decrement}>
        -
      </Button>
      <p>{count}</p>
      <Button onClick={increment}>+</Button>
    </Grid>
  );
};

export default Increment;

const Grid = styled.div`
  display: flex;
  justify-items: center;
  text-align: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 8px;
  width: 48px;
  height: 48px;
  text-align: center;
`;
