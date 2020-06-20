import { makeSchema } from '@nexus/schema'
import * as types from './graphql'
import { prismaSelectObject } from 'nexus-schema-plugin-prisma-select'
import { join } from 'path'
import { applyMiddleware } from 'graphql-middleware'
import permissions from './middleware/permissions'


export const schema = applyMiddleware(makeSchema({
  types,
  plugins: [prismaSelectObject()],
  outputs: {
    schema: join(process.cwd(), 'src', 'generated', 'schema.graphql'),
    typegen: join(process.cwd(), 'src', 'generated', 'nexus-typegen.ts'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
}), permissions)
