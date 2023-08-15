import styled from "styled-components";

export const Form = styled.form`
  display: grid;
  grid-gap: 16px;
  width: 720px;
  margin: auto;

  input {
    font-size: 24px;
    height: 56px;
    border: none;
    border-bottom: 1px solid grey;
  }
  button {
    border: none;
    height: 56px;
    background-color: orange;
    border-radius: 10px;
    font-size: 24px;
    width: 112px;
    justify-self: center;
  }
  input:focus {
    outline: none;
  }
`;
