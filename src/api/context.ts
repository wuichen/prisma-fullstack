import { PrismaClient, PrismaClientOptions } from '@prisma/client'
import PrismaDelete, { onDeleteArgs } from '@prisma-tools/delete'
import { NextApiRequest, NextApiResponse } from 'next'
import { getUserId, getUserPermissions } from './utils'
import { schema } from './graphql/schema/schema'

class Prisma extends PrismaClient {
  constructor(options?: PrismaClientOptions) {
    super(options)
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this, schema)
    await prismaDelete.onDelete(args)
  }
}

const prisma = new Prisma()

export interface Context extends NextApi {
  prisma: Prisma
  userId?: number
  select: any
  permissions?: object
}

interface NextApi {
  req: NextApiRequest
  res: NextApiResponse
}

export function createContext({ req, res }: NextApi): Context {
  return {
    req,
    res,
    prisma,
    permissions: getUserPermissions(req),
    userId: getUserId(req),
    select: {},
  }
}
