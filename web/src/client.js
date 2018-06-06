import ApolloClient from 'apollo-client';
import {
  onError
} from 'apollo-link-error';
import {
  ApolloLink,
  //Observable
} from 'apollo-link';
import {
  InMemoryCache
} from 'apollo-cache-inmemory';
import {
  createHttpLink
} from 'apollo-link-http';
import {
  WebSocketLink
} from 'apollo-link-ws';
import {
  split
} from 'apollo-link';
import {
  getMainDefinition
} from 'apollo-utilities';
import {
  withClientState
} from 'apollo-link-state';

import {
  defaults,
  resolvers
} from './resolvers';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults,
  resolvers,
});

// Gonna be used when implementing JWT
/*

const request = async (operation) => {
  const token = await AsyncStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token
    }
  });
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

*/

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/subscriptions`,
  options: {
    reconnect: true
  }
});

const link = split(
  ({
    query
  }) => {
    const {
      kind,
      operation
    } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({
      graphQLErrors,
      networkError
    }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({
          message,
          locations,
          path
        }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
        // Log erros here to logs service
        //sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        //logoutUser();
      }
    }),
    stateLink,
    link,
  ]),
  cache,
});

export default client;
