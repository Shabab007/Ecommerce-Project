import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Navbar from "./component/Navbar/navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { AuthProvider } from "./component/context/authContext";
import { ApolloProvider } from "@apollo/react-hooks";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./component/Auth/signup";
import "./index.css";
import Create from "./pages/Create";
import { setContext } from "apollo-link-context";
import {
  ProductProvider,
  ProductContext,
} from "./component/context/productContext.js";
import Cart from "./pages/Cart.js";
import ProductDteails from "./pages/ProductDteails.js";
import { resolvers } from "./apolloClient/resolvers";
import { persistCache } from "apollo-cache-persist";

const App = () => {
  const [client, setClient] = useState(undefined);

  useEffect(() => {
    const httpLink = createUploadLink({
      uri: "http://localhost:5000/graphql",
    });

    const authLink = setContext(() => {
      const token = localStorage.getItem("jwtToken");
      console.log(token);
      return {
        headers: {
          authorization: token ? `${token}` : "",
        },
      };
    });

    const cache = new InMemoryCache();
    cache.writeData({
      data: {
        cart: {
          item: [],
          quantity: 0,
          totalPrice: 0,
          __typename: "Cart",
        },
      },
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache,
      resolvers,
    });

    persistCache({
      cache,
      storage: window.localStorage,
    }).then(() => {
      client.onResetStore(async () =>
        cache.writeData({
          data: {
            cart: {
              item: [],
              quantity: 0,
              totalPrice: 0,
              __typename: "Cart",
            },
          },
        })
      );
      setClient(client);
    });
  }, []);

  if (client === undefined) return <div>Loading...</div>;
  return (
    <>
      <ApolloProvider client={client}>
        <AuthProvider client={client}>
          <ProductProvider>
            <Router>
              <Navbar />
              <Route exact path="/" component={Home} />

              <Route exact path="/login" component={Login} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/signup" component={SignUp} />
              <Route
                exact
                path="/product/:productId"
                component={ProductDteails}
              />
            </Router>
          </ProductProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
};
export default App;
ReactDOM.render(<App />, document.querySelector("#root"));
