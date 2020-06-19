import { extendType, stringArg, intArg, objectType } from '@nexus/schema'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '../../utils'
import cookie from 'cookie'
import { UserInputError } from 'apollo-server-micro'

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User', nullable: true })
    t.field('company', { type: 'Company', nullable: true })
    t.field('platform', { type: 'Platform', nullable: true })
  },
})

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

export const setHeaderAndSignToken = (res, signatures) => {
  const token = sign(signatures, JWT_SECRET)
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: 6 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }),
  )
  return token
}

export const AuthMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signUp', {
      type: AuthPayload,
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

        const token = setHeaderAndSignToken(ctx.res, { userId: user.id })

        return { user, token }
      },
    })
    t.field('loginPlatform', {
      type: AuthPayload,
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
        const token = setHeaderAndSignToken(ctx.res, { userId: user.id, permissions })

        return { platform, token }
      },
    })
    t.field('loginCompany', {
      type: AuthPayload,
      nullable: true,
      args: {
        companyId: intArg({ nullable: false }),
      },
      resolve: async (_parent, { companyId }, { prisma, userId, res }) => {
        try {
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
              role: true
            },
          })

          let permissions = {}
          if (staffs && staffs.length && staffs.length > 0) {
            permissions = { role: staffs[0].role.name, companyId: staffs[0].company.id }
          } else {
            throw new UserInputError(`No company found: ${companyId}`)
          }
          const company = staffs[0].company
          const token = setHeaderAndSignToken(res, { userId, permissions })
          return { company, token }
        } catch (err) {
          console.log(err)
          throw new Error(err)
        }

      },
    })
    t.field('login', {
      type: AuthPayload,
      nullable: true,
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        try {
          const user = await ctx.prisma.user.findOne({
            where: {
              email,
            },
          })
          console.log(user)
          if (!user) {
            throw new UserInputError(`No user found for email: ${email}`)
          }
          const passwordValid = await compare(password, user.password)
          if (!passwordValid) {
            throw new UserInputError('Invalid password')
          }
          const token = setHeaderAndSignToken(ctx.res, { userId: user.id })

          return { user, token }
        } catch (err) {
          console.log(err)
          throw new Error(err)
        }

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
