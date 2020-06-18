import { ApolloServer } from 'apollo-server-micro';
// import { schema } from 'api/schema';
import typeDefs from 'api/modules/models/typeDefs';
import resolvers from 'api/modules/models/resolvers';
import { createContext, Context } from 'api/context';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelect } from '@prisma-tools/select';

let schema = makeExecutableSchema({ typeDefs, resolvers });

const middleware = async (
  resolve,
  root,
  args,
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const result = new PrismaSelect(info).value;
  if (Object.keys(result.select).length > 0) {
    args = {
      ...args,
      ...result,
    };
  }
  return resolve(root, args, context, info);
};

schema = applyMiddleware(schema, middleware);

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/modules' });
