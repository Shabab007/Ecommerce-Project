import styled from "styled-components";

export const Grid = styled.div`
  padding: 8px;
  width: 1600px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 16px;
  transition: 0.5s ease-out;
  :hover {
    border: 1px solid grey;
    box-shadow: 0.5px 0.5px 10px grey;
  }
`;
export const Label = styled.label``;

export const Check = styled.input`
  margin: auto 4px;
`;
export const Section = styled.div`
  margin: auto;
  width: 1600px;
`;
