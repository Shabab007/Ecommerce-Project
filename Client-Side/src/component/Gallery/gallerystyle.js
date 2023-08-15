import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  background: red;
  height: 500px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

export const Image1 = styled.div`
  height: 100%;
  background: green;
  grid-column: 1/3;
  grid-row: 1/3;
`;

export const Image2 = styled.div`
  height: 100%;
  background: blue;
  grid-column: 3/4;
`;

export const Image3 = styled.div`
  height: 100%;
  background: yellow;
  grid-column: 4/5;
`;

export const Image4 = styled.div`
  height: 100%;
  background: purple;
  grid-column: 3/5;
`;

export const Flash = styled.img`
  height: 100%;
  width: 100%;
`;
