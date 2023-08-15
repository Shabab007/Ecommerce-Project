const { gql } = require("apollo-server");
module.exports = gql`
  extend type Query {
    getUsers: [User!]
    findUser(id: ID!): User
  }
  extend type Mutation {
    signUp(input: signUpInput!): AuthUser!
    signIn(input: signInInput!): AuthUser!
  }

  input signUpInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input signInInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    password: String!
  }
  type AuthUser {
    token: String!
    user: User!
  }
`;
