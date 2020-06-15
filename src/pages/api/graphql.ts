import { ApolloServer } from 'apollo-server-micro';
import { schema } from 'api/schema';
import { createContext } from 'api/context';

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
