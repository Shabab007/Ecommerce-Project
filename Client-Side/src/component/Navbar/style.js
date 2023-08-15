import styled from "styled-components";

import { TiShoppingCart } from "react-icons/ti";

export const Nav = styled.div`
  margin: auto;

  display: grid;
  height: 80px;
  grid-template-columns: repeat(13, 1fr);
  grid-gap: 16px;
  justify-items: center;
  align-items: center;

  color: teal;
  font-weight: bold;
  cursor: pointer;
  div p {
    font-family: monospace;
    color: black;
    font-size: 16px;
  }
  div p:hover {
    border-bottom: 1px solid black;
  }
`;

export const Title = styled.h1`
  /* text-align: center; */
  padding-top: 56px;
  margin: 0 auto;
  font-size: 72px;
  font-weight: bold;
`;
export const Addres = styled.p`
  /* text-align: center; */
  margin: 0 auto;
  font-size: 24px;
  &:before {
    position: relative;
    left: -88px;
    top: 18px;
    content: "";
    height: 3px;
    display: flex;
    width: 80px;
    background: red;
  }
  &:after {
    position: relative;
    left: 224px;
    top: -18px;
    content: "";
    height: 3px;
    display: flex;
    width: 80px;
    background: red;
  }
`;
export const Space = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 300px;
  margin: auto;
`;

export const Cart = styled(TiShoppingCart)`
  color: black;
  font-size: 24px;
  grid-column: 12/ 13;
  justify-self: end;
`;
