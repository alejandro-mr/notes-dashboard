import ApolloClient from "apollo-boost";

import { resolvers } from './resolvers';

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  clientState: {
    resolvers
  }
});

export default client;
