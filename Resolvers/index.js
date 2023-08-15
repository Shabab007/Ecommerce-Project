const userResolvers = require("./user");
const productResolvers = require("./product");
const categoryResolvers = require("./category");
const { GraphQLDateTime } = require("graphql-iso-date");

const cusDateScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [
  userResolvers,
  cusDateScalarResolver,
  productResolvers,
  categoryResolvers,
];
