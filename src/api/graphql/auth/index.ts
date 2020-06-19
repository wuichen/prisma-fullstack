import { extendType, stringArg, intArg } from '@nexus/schema'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '../../utils'
import cookie from 'cookie'
import { UserInputError } from 'apollo-server-micro'

export const AuthQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: async (_, __, { prisma, select, userId }) => {
        if (!userId) return null
        return prisma.user.findOne({
          where: {
            id: userId,
          },
          ...select,
        })
      },
    })
  },
})

export const AuthMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'User',
      args: {
        name: stringArg(),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            username: name,
            email,
            password: hashedPassword,
          },
        })
        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', sign({ userId: user.id }, JWT_SECRET), {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          }),
        )
        return user
      },
    })
    t.field('loginPlatform', {
      type: 'Platform',
      nullable: true,
      args: {
        platformId: intArg({ nullable: false }),
      },
      resolve: async (_parent, { platformId }, { prisma, userId, res }) => {
        const platform = await prisma.platform.findOne({
          where: {
            id: platformId
          },
          include: {
            user: true
          }
        })
        let permissions = {}

        if (platform && platform.user && platform.user.id) {
          permissions = { role: 'admin', platformId: platform.id }
        } else {
          throw new UserInputError(`No platform found: ${platformId}`)
        }

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', sign({ userId: userId, permissions }, JWT_SECRET), {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          }),
        )
        return platform
      },
    })
    t.field('loginCompany', {
      type: 'Company',
      nullable: true,
      args: {
        companyId: intArg({ nullable: false }),
      },
      resolve: async (_parent, { companyId }, { prisma, userId, res }) => {
        const staffs = await prisma.staff.findMany({
          where: {
            company: {
              id: companyId,
            },
            user: {
              id: userId,
            },
          },
          include: {
            company: true,
            user: true,
          },
        })
        let permissions = {}
        if (staffs && staffs.length && staffs.length > 0) {
          permissions = { role: staffs[0].role, companyId: staffs[0].company.id }
        } else {
          throw new UserInputError(`No company found: ${companyId}`)
        }
        const company = staffs.company

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', sign({ userId: userId, permissions }, JWT_SECRET), {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          }),
        )
        return company
      },
    })
    t.field('login', {
      type: 'User',
      nullable: true,
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new UserInputError(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new UserInputError('Invalid password')
        }
        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', sign({ userId: user.id }, JWT_SECRET), {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          }),
        )
        return user
      },
    })
    t.field('logout', {
      type: 'Boolean',
      resolve(_parent, _args, ctx) {
        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', '', {
            httpOnly: true,
            maxAge: -1,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          }),
        )
        return true
      },
    })
    t.field('updatePassword', {
      type: 'Boolean',
      args: {
        currentPassword: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_, { currentPassword, password }, ctx) => {
        if (currentPassword && password) {
          // get current user and verify currentPassword before changing;
          const user = await ctx.prisma.user.findOne({
            where: { id: ctx.userId },
            select: { password: true },
          })
          if (!user) {
            return false
          }
          const validPass = await compare(currentPassword, user.password)
          if (!validPass) throw new UserInputError('Incorrect Current Password, Error: 1015')
          const hashPassword = await hash(password, 10)

          await ctx.prisma.user.update({
            data: { password: hashPassword },
            where: { id: ctx.userId },
          })
          return true
        }
        return false
      },
    })
  },
})
