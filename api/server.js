import Hapi from 'hapi';
import mongoose from 'mongoose';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';

import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import typeDefs from './src/schema/';
import resolvers from './src/resolvers';

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const HOST = '0.0.0.0';
const PORT = 8080;
const WS_PORT = 5000;

async function StartServer() {
  const server = new Hapi.server({
    host: HOST,
    port: PORT,
    debug: {
      request: ['error'],
    },
  });

  mongoose.connect(process.env.DB_URL);

  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema: executableSchema,
      },
      route: {
        cors: true,
      },
    },
  });

  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql',
        subscriptionsEndpoint: `ws://localhost:${WS_PORT}/subscriptions`
      },
    },
  });

  const websocketServer = createServer(server);
  await websocketServer.listen({
    host: HOST,
    port: WS_PORT
  }, () => console.log(`Websocket Server is now running on http://${HOST}:${WS_PORT}/subscriptions`));

  const subscriptionServer = SubscriptionServer.create(
    {
      schema: executableSchema,
      execute,
      subscribe,
    },
    {
      server: websocketServer,
      path: '/subscriptions',
    }
  );

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();
