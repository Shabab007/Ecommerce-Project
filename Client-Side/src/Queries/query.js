import gql from "graphql-tag";

export const GET_PROD = gql`
  {
    getProducts {
      name
      id
      price
      brand
      categories {
        id
        name
      }
    }
  }
`;
export const GET_CAT = gql`
  query {
    getCats {
      name
      id
      products {
        name
        id
        brand
        price
      }
    }
  }
`;

export const FIND_PROD = gql`
  query($id: ID!) {
    findProduct(id: $id) {
      id
      name
      brand
      price
      createdAt
      updatedAt
      categories {
        id
        name
        products {
          id
          name
          brand
          price
        }
      }
    }
  }
`;

export const PAGI_PROD = gql`
  query($limit: Int!, $cursor: String!) {
    pagiProducts(limit: $limit, cursor: $cursor) {
      product {
        name
        brand
        price
        categories {
          name
        }
      }
      pageInfo {
        hasNextPage
        nextPageCursor
      }
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    cart @client {
      item
      quantity
      totalPrice
    }
  }
`;
export const GET_CLIENT = gql`
  query GetClient {
    client @client
  }
`;
