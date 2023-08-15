import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

export const Sicon = styled(BsSearch)`
  color: black;
  font-size: 16px;
`;
export const Label = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const Input = styled.input`
  padding-left: 8px;
  border: none;

  :focus {
    outline: none;
    background-color: ash;
  }
`;

export const Icon = styled.div`
  grid-column: 2 / 6;
  justify-self: start;
`;
