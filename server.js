const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { connection } = require("./Database/util");
const app = express();
const typeDefs = require("./TypeDefs");
const resolvers = require("./Resolvers");
const Dotenv = require("dotenv");
const { createToken, getUserFromToken } = require("./Auth/auth");
const User = require("./Models/user");
const Product = require("./Models/Product");
const Category = require("./Models/Category");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51H1sYLGvsYapsm2yRuJCRj6BdRMyZgw8fK6Pj6ZMiqUryGpCZz18pbxBDM6TGt6m8yehnVEcMkRmhYIH5Rl0MLkF00ZCNHcGJz"
);
const { existsSync, mkdirSync } = require("fs");
const path = require("path");
Dotenv.config();
connection();
console.log("hi");
app.use(express.json());
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization;

    const userT = await getUserFromToken(token);

    return { User, Product, Category, userT, createToken };
  },
});
existsSync(path.join(__dirname, "./images")) ||
  mkdirSync(path.join(__dirname, "./images"));
server.applyMiddleware({ app });
app.listen(5000, res => {
  console.log(`Server is running at 5000`);
});

app.post("/payment", (req, res) => {
  const { product, token, price } = req.body;
  console.log(product, token, price);
  const idempontencyKey = uuid();
  const des = product.map(prod => prod.name);
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then(customer => {
      stripe.charges.create({
        amount: price * 100,
        currency: "usd",
        customer: customer.id,
        description: des.toString(),
      });
    })
    .then(result => res.status(200).json(result))
    .catch(err => conole.log(err));
});
