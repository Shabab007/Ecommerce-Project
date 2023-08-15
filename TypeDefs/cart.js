const { gql } = require("apollo-server");
module.exports = gql`
  extend type Query {
    getCarts: [Cart!]
  }
  extend type Mutation {
    createCart(input: createCartInput!): Cart!
  }
  input createCartInput {
    product: [String!]
    user: String!
  }

  type Cart {
    id: ID!
    product: [Product!]
    user: User!
  }
`;
