import { schema } from '../graphql/schema/schema'

const Query: any = {}


const isPrivateModel = (model) => {
  console.log(model)
  return model.fields.find((field) => {
    return field.name === 'private'
  })
}

// when private model request comes from user, it will come with a where query with user id
// when private model request comes from company, it wont come with a where query with company id, we should generate for them
schema.models.map((model) => {
  Query[`findMany${model.name}`] = async (resolve, parent, args, context, info) => {
    let result = []
    const { permissions, userId } = context
    // if (isPrivateModel(model)) {
    console.log(args)
    if (args.where?.user?.id?.equals === userId || args.where?.owner?.id?.equals === userId) {
      result = await resolve(parent, args, context, info)
    } else if (permissions.companyId) {
      const argsWithDefault = {
        ...args, where: {
          ...args.where,
          company: {
            id: {
              equals: permissions.companyId
            }
          }
        }
      }
      console.log(argsWithDefault)
      result = await resolve(parent, argsWithDefault, context, info)
    }
    // } else {
    //   result = await resolve(parent, args, context, info)
    // }
    return result
  }
  Query[`findMany${model.name}Count`] = async (resolve, parent, args, context, info) => {
    let result = []
    const { permissions, userId } = context
    // if (isPrivateModel(model)) {
    console.log(args)
    if (args.where?.user?.id?.equals === userId || args.where?.owner?.id?.equals === userId) {
      result = await resolve(parent, args, context, info)
    } else if (permissions.companyId) {
      const argsWithDefault = {
        ...args, where: {
          ...args.where,
          company: {
            id: {
              equals: permissions.companyId
            }
          }
        }
      }
      console.log(argsWithDefault)
      result = await resolve(parent, argsWithDefault, context, info)
    }
    // } else {
    //   result = await resolve(parent, args, context, info)
    // }
    return result
  }
})

const generateData = {
  'Mutation': {
    createOneCompany: async (resolve, parent, args, context, info) => {
      // You can use middleware to override arguments
      const argsWithDefault = { ...args }
      console.log(argsWithDefault)
      const result = await resolve(parent, argsWithDefault, context, info)
      // Or change the returned values of resolvers
      return result
    },
  },
  Query
}

export default generateData