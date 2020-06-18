import { generateGraphQlSDLFile } from '@prisma-tools/sdl';
import typeDefs from 'api/modules/models/typeDefs';
import resolvers from 'api/modules/models/resolvers';
import { makeExecutableSchema } from 'graphql-tools';

let schema = makeExecutableSchema({ typeDefs, resolvers });

generateGraphQlSDLFile(schema, 'src/generated/schema.graphql');
