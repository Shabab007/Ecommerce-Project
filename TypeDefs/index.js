const userDefs = require("./user");
const productDefs = require("./product");
const categoryDefs = require("./category");
const cartDefs = require("./cart");
const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [typeDefs, userDefs, productDefs, categoryDefs, cartDefs];
