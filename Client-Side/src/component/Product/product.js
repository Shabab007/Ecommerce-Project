import React, { useContext, useState } from "react";
import { GET_PROD, GET_CART } from "../../Queries/query";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { ProductContext } from "../context/productContext.js";

import Item from "../item/item";
import Pagination from "../pagination/pagination.js";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const { loading, error, data } = useQuery(GET_PROD);
  const { loading: load, error: er, data: cart } = useQuery(GET_CART);
  const { updateProduct, categories, search } = useContext(ProductContext);

  console.log(search);
  if (data) {
    updateProduct(data);
    console.log(data);
  }
  if (cart) {
    console.log(cart);
  }
  const searchProd = () => {
    if (data && search) {
      return data.getProducts.filter(prod => {
        return prod.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      });
    }
  };
  const searchedProducts = searchProd();

  let checked = [];
  if (categories) {
    categories.forEach(element => {
      element.products.forEach(prod => {
        console.log(prod);
        checked = [...checked, prod];
        console.log(checked);
      });
    });
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  console.log(indexOfLastPost);

  const serachedPosts = searchedProducts
    ? searchedProducts.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const checkedPosts = checked
    ? checked.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  console.log(checkedPosts.length);
  const currentPosts = data
    ? data.getProducts.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  // Change page
  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Heading>
        <h1>Shop</h1>
      </Heading>
      <Container>
        {loading ? (
          <p>Loading....</p>
        ) : search ? (
          <>
            <Item currentPosts={serachedPosts} />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={searchedProducts.length}
              paginate={paginate}
            />
          </>
        ) : checked.length ? (
          <>
            <Item currentPosts={checkedPosts} />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={checked.length}
              paginate={paginate}
            />
          </>
        ) : (
          <>
            <Item currentPosts={currentPosts} />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={data.getProducts.length}
              paginate={paginate}
            />
          </>
        )}
      </Container>
      <Section></Section>
    </div>
  );
};

export default Product;

export const Heading = styled.div`
  margin: auto;
  width: 1600px;
  height: 96px;

  h1 {
    font-size: 56px;
    font-weight: normal;
    padding: 12px 10px;
  }
`;
export const Container = styled.div`
  margin: auto;
  width: 1600px;

  @media (max-width: 1600px) {
    width: 1200px;
  }
  @media (max-width: 1200px) {
    width: 800px;
  }
  @media (max-width: 650px) {
    width: 300px;
  }
`;

const Section = styled.div`
  margin: auto;
  width: 1600px;
  height: 400px;
  background: rgb(233, 233, 233);
`;
