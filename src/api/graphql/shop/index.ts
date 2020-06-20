import { objectType, stringArg, intArg, enumType, scalarType, extendType } from '@nexus/schema'
import { Product, Address, User, Card, Company, Category, Order, Coupon } from '../models'
import { ProductWhereInput } from 'generated'

const Gallery = objectType({
  name: 'Gallery',
  definition(t) {
    t.string('url')
  },
})
const Meta = objectType({
  name: 'Meta',
  definition(t) {
    t.string('publisher')
    t.string('isbn')
    t.string('edition')
    t.string('country')
    t.list.string('languages')
    t.string('numberOfReader')
    t.string('numberOfPage')
    t.string('samplePDF')
  },
})
// export const Mutation = extendType({
//   type: 'Mutation',
//   definition(t) {
// t.field('updateMe', {
//   type: User,
//   args: {
//     meInput: stringArg({ required: true }),
//   },
// })
// t.field('updateAddress', {
//   type: User,
//   args: {
//     addressInput: stringArg({ required: true }),
//   },
// })
// t.field('updateContact', {
//   type: User,
//   args: {
//     contactInput: stringArg({ required: true }),
//   },
// })
// t.field('deleteAddress', {
//   type: User,
//   args: {
//     addressId: stringArg({ required: true }),
//   },
// })
// t.field('deleteContact', {
//   type: User,
//   args: {
//     contactId: stringArg({ required: true }),
//   },
// })
// t.field('addPaymentCard', {
//   type: User,
//   args: {
//     cardInput: stringArg({ required: true }),
//   },
// })
// t.field('deletePaymentCard', {
//   type: User,
//   args: {
//     cardId: stringArg({ required: true }),
//   },
// })
// t.field('charge', {
//   type: Payment,
//   args: {
//     paymentInput: stringArg({ required: true }),
//   },
// })
// t.field('addOrder', {
//   type: Order,
//   args: {
//     orderInput: stringArg({ required: true }),
//   },
// })
// t.field('applyCoupon', {
//   type: Coupon,
//   args: {
//     code: stringArg({ required: true }),
//   },
// })
//   },
// })

const Payment = objectType({
  name: 'Payment',
  definition(t) {
    t.string('status')
  },
})

const ProductResponse = objectType({
  name: 'ProductResponse',
  definition(t) {
    t.list.field('items', { type: Product })
    t.int('total')
    t.boolean('hasMore')
  },
})
export const Query = extendType({
  type: 'Query',
  definition(t) {
    t.field('products', {
      type: ProductResponse,
      args: {
        category: stringArg(),
        text: stringArg(),
        type: stringArg(),
        offset: intArg({ default: 0 }),
        limit: intArg({ default: 10 }),
      },
      resolve: async (_, { category, text, type, offset, limit }, { prisma, user }) => {
        const where: ProductWhereInput = {}
        if (type) {
          where.type = {
            equals: type,
          }
        }
        if (category) {
          where.categories = {
            some: {
              slug: {
                startsWith: category,
              },
            },
          }
        }

        if (text) {
          where.name = {
            contains: text,
          }
        }
        const products = await prisma.product.findMany({
          where,
          include: {
            categories: true,
          },
          take: limit,
          skip: offset,
        })
        const count = await prisma.product.count({
          where: {
            type: {
              equals: type,
            },
          },
        })
        return {
          items: products,
          total: count,
          hasMore: limit + offset > count ? false : true,
        }
      },
    })
    // t.field('product', {
    //   type: Product,
    //   args: {
    //     slug: stringArg({ required: true }),
    //   },
    //   resolve: async (_, { slug }, { prisma }) => {
    //     const product = await prisma.product.findOne({
    //       where: {
    //         slug,
    //       },
    //       include: {
    //         categories: true,
    //       },
    //     })
    //     return product
    //   },
    // })
    // t.list.field('relatedProducts', {
    //   type: Product,
    //   args: {
    //     type: stringArg(),
    //     slug: stringArg({ required: true }),
    //   },
    //   resolve: async (_, { slug, type }, { prisma }) => {
    //     const products = await prisma.product.findMany({
    //       where: {
    //         type: {
    //           equals: type,
    //         },
    //       },
    //     })
    //     return products
    //   },
    // })
    // t.list.field('orders', {
    //   type: Order,
    //   args: {
    //     limit: intArg({ default: 7 }),
    //     // text: stringArg(),
    //     // user: intArg({ required: true }),
    //   },
    //   resolve: async (_, { limit }, { prisma, user }) => {
    //     const orders = await prisma.order.findMany({
    //       where: {
    //         customer: {
    //           user: {
    //             id: user.user_id,
    //           },
    //         },
    //       },
    //       take: limit,
    //     })
    //     return orders
    //   },
    // })
    // t.field('order', {
    //   type: Order,
    //   args: {
    //     id: intArg({ required: true }),
    //   },
    //   resolve: async (_, { id }, { prisma, userId }) => {
    //     const order = await prisma.order.findOne({
    //       where: {
    //         id,
    //       },
    //       include: {
    //         customer: true,
    //       },
    //     })
    //     if (order.customer.userId === userId) {
    //       return order
    //     } else {
    //       throw new Error('The order doesnt belong to the calling persons id')
    //     }
    //   },
    // })
    // t.list.field('coupons', { type: Coupon })
    t.list.field('categories', {
      type: Category,
      args: {
        type: stringArg({ required: true }),
      },
      resolve: async (_, { type }, { prisma }) => {
        const categories = await prisma.category.findMany({
          where: {
            type: {
              equals: type,
            },
            children: {
              every: {},
            },
          },
          include: {
            children: true,
          },
        })
        console.log(categories)
        const topLevelCategories = []
        for (let index = 0; index < categories.length; index++) {
          const element = categories[index]
          if (!element.parentId) {
            topLevelCategories.push(element)
          }
        }
        return topLevelCategories
      },
    })
    // t.field('category', {
    //   type: Category,
    //   args: {
    //     id: intArg({ required: true }),
    //   },
    //   resolve: async (_, { id }, { prisma }) => {
    //     const category = await prisma.category.findOne({
    //       where: {
    //         id,
    //       },
    //     })
    //     return category
    //   },
    // })
    // t.field('vendors', {
    //   type: Vendors,
    //   args: {
    //     limit: intArg({ default: 10 }),
    //     offset: intArg({ default: 0 }),
    //     type: stringArg(),
    //     text: stringArg(),
    //     category: stringArg(),
    //   },
    //   resolve: async (_, { limit, offset, type, text, category }, { prisma }) => {
    //     const companies = await prisma.company.findMany({
    //       where: {
    //         platform: {
    //           slug: type,
    //         },
    //         categories: {
    //           some: {
    //             slug: {
    //               equals: category,
    //             },
    //           },
    //         },
    //         name: {
    //           contains: text,
    //         },
    //       },
    //       include: {
    //         categories: true,
    //         deliveryDetail: true,
    //       },
    //       take: limit,
    //       skip: offset,
    //     })
    //     const count = await prisma.company.count({
    //       where: {
    //         platform: {
    //           slug: type,
    //         },
    //       },
    //     })
    //     return { items: companies, hasMore: limit + offset > count ? false : true, totalCount: count }
    //   },
    // })
    // t.field('vendor', {
    //   type: Company,
    //   args: {
    //     slug: stringArg({ required: true }),
    //   },
    //   resolve: async (_, { slug }, { prisma }) => {
    //     const company = await prisma.company.findOne({
    //       where: {
    //         slug,
    //       },
    //       include: {
    //         categories: true,
    //         deliveryDetail: true,
    //         products: true,
    //       },
    //     })
    //     return company
    //   },
    // })
  },
})
const Social = objectType({
  name: 'Social',
  definition(t) {
    t.id('id')
    t.string('media')
    t.string('profileLink')
  },
})

const Vendors = objectType({
  name: 'Vendors',
  definition(t) {
    t.list.field('items', {
      type: Company,
      nullable: true,
    })
    t.int('totalCount', { nullable: true })
    t.boolean('hasMore')
  },
})
