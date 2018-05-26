import ApolloClient from "apollo-boost";

import { defaults, resolvers } from './resolvers';

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  clientState: {
    defaults,
    resolvers
  }
});

export default client;
