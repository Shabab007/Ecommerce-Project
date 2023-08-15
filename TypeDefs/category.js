const { gql } = require("apollo-server");
module.exports = gql`
  extend type Query {
    getCats: [Category!]

    findCat(name: String!): [Category!]
  }
  extend type Mutation {
    createCat(name: String!): Category!
    updateCat(id: ID!, name: String!): Category!
    deleteCat(id: ID!): Category!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]
  }
`;
