import React from "react";
import styled from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex>
      {pageNumbers.map(number => (
        <Button key={number} onClick={e => paginate(number, e)}>
          {number}
        </Button>
      ))}
    </Flex>
  );
};

export default Pagination;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px auto;
`;

const Button = styled.button`
  margin: 0 8px;
  height: 80px;
  width: 80px;
  border: none;
  background: #0b132b;
  color: white;
`;
