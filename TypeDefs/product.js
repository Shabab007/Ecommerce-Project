const { gql } = require("apollo-server");
module.exports = gql`
  extend type Query {
    pagiProducts(cursor: String, limit: Int): ProductFeed!
    getProducts: [Product!]
    findProduct(id: ID!): Product!
  }
  extend type Mutation {
    uploadImage(file: Upload!): Boolean
    createProduct(input: createProductInput!): Product!
    updateProduct(id: ID!, category: String, input: updateInput): Product!
    deleteProduct(id: ID!): Product!
  }
  type ProductFeed {
    product: [Product!]
    pageInfo: pageInfo
  }
  type pageInfo {
    hasNextPage: Boolean
    nextPageCursor: String
  }
  input createProductInput {
    name: String!
    price: String!
    category: String!
    brand: String!
  }
  input updateInput {
    name: String
    price: String

    brand: String
  }
  type Product {
    id: ID!
    picture: String
    name: String!
    price: String!
    brand: String
    createdAt: String!
    updatedAt: String!
    categories: [Category!]
  }
`;
