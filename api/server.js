'use strict';

import Hapi from 'hapi';
import mongoose from 'mongoose';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';

import typeDefs from './src/schema.graphql';
import resolvers from './src/resolvers.js';

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const HOST = '0.0.0.0';
const PORT = 8080;

async function StartServer() {
  const server = new Hapi.server({
    host: HOST,
    port: PORT,
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
      },
    },
  });

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);

}

StartServer();
