import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import iphone from "../../Images/iphonex.jpg";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TO_CART } from "../../Queries/mutaion";

const Item = ({ currentPosts }) => {
  const [addToCart] = useMutation(ADD_TO_CART);

  const handleClick = id => {
    addToCart({
      variables: {
        id: id,
      },
    });
  };
  return (
    <Grid>
      {currentPosts.map(product => (
        <Border key={product.id}>
          <Href to={`/product/${product.id}`} key={product.id}>
            <Image src={iphone} alt="name" />
            <Line />
            <Name>{product.name}</Name>
            <Brand>{product.brand}</Brand>
            <Price>${product.price}</Price>
          </Href>
          <Button onClick={() => handleClick(product.id)}>Add to Cart</Button>
        </Border>
      ))}
    </Grid>
  );
};

export default Item;

export const Grid = styled.div`
  margin: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 32px 32px;
`;
export const Border = styled.div`
  background: rgb(233, 233, 233);

  display: grid;
  overflow: hidden;

  height: 512px;
  transition: 0.5s;
  div {
    transition: 0.5s transform;
  }
  :hover {
    button {
      transform: translateX(0px);
      transform-origin: right;
    }
    div {
      transform: translateY(0px);
    }
    box-shadow: 0.5px 0.5px 15px grey;
  }
`;
export const Price = styled.div`
  background: rgb(233, 233, 233);
  font-size: 24px;
  justify-self: center;
  align-self: center;
  transform: translateY(30px);
`;
export const Line = styled.div`
  border-top: 1px solid grey;
  margin: auto;
  width: 90%;
  background: rgb(233, 233, 233);
`;
export const Name = styled.div`
  background: rgb(233, 233, 233);
  justify-self: center;
  align-self: center;
  transform: translateY(30px);
`;
export const Brand = styled.div`
  background: rgb(233, 233, 233);
  justify-self: center;
  align-self: center;
  transform: translateY(30px);
`;
export const Button = styled.button`
  align-self: center;
  padding: 12px 24px;
  color: rgb(233, 233, 233);
  font-size: 1rem;
  background: #0b132b;
  border: none;
  border-radius: 10px;
  height: 56px;
  width: 150px;
  cursor: pointer;
  justify-self: center;
  font-family: "Roboto Mono", monospace;
  transform: translatex(150%);
  transition: 0.5s;
  transform-origin: right;
  :hover {
    background: rgb(233, 233, 233);
    color: teal;
    font-weight: bold;
  }
`;

export const Image = styled.img`
  height: 300px;
  transition: 1s;
  width: 100%;

  margin: 0 auto;
  :hover {
    border-radius: 20px;
    transform: scale(0.95);
  }
`;
export const Href = styled(Link)`
  display: grid;
`;
