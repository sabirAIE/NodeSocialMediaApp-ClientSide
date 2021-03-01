import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

import { setContext } from "apollo-link-context";

const httpLink = new createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext(() => {
  const StoredToken = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: StoredToken ? `Bearer ${StoredToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
