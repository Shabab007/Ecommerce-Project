import gql from "graphql-tag";

export const SIGNUP_QUERY = gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      input: {
        name: $name
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      token
      user {
        name
      }
    }
  }
`;

export const SIGNIN_QUERY = gql`
  mutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
      user {
        name
        id
        role
      }
    }
  }
`;
export const CREATE_CAT = gql`
  mutation($name: String!) {
    createCat(name: $name) {
      id
      name
      products {
        name
        brand
      }
    }
  }
`;
export const CREATE_PROD = gql`
  mutation(
    $name: String!
    $brand: String!
    $price: String!
    $category: String!
  ) {
    createProduct(
      input: { name: $name, brand: $brand, price: $price, category: $category }
    ) {
      name
      id
      price
      brand
    }
  }
`;

export const UPDATE_PROD = gql`
  mutation(
    $id: ID!
    $name: String
    $brand: String
    $price: String
    $category: String
  ) {
    updateProduct(
      id: $id
      category: $category
      input: { name: $name, brand: $brand, price: $price }
    ) {
      id
      name
      price
      brand
    }
  }
`;

export const DELETE_PROD = gql`
  mutation($id: ID!) {
    deleteProduct(id: $id) {
      name
      id
      brand
      price
    }
  }
`;
export const ADD_TO_CART = gql`
  mutation($id: ID!) {
    addItemToCart(id: $id) @client
  }
`;
export const COUNT_PROD = gql`
  mutation($id: ID!, $qty: Int!) {
    counterItems(id: $id, qty: $qty) @client
  }
`;
export const DEL_CART = gql`
  mutation($id: ID!) {
    removeItem(id: $id) @client
  }
`;
export const UPLOAD_FILE = gql`
  mutation($file: Upload!) {
    uploadImage(file: $file)
  }
`;
