import { schema } from '../graphql/schema/schema'

const Query: any = {}
const Mutation: any = {}

const isPrivateModel = (model) => {
  return model.fields.find((field) => {
    return field.name === 'private'
  })
}

const isPublishableModel = (model) => {
  return model.fields.find((field) => {
    return field.name === 'published'
  })
}

const isCompanyModel = (model) => {
  return model.fields.find((field) => {
    return field.name === 'company'
  })
}

const isAuthUserInWhere = (args, userId) => {
  return (args.where?.user?.id?.equals === userId || args.where?.owner?.id?.equals === userId)
}
const isAuthCompanyInWhere = (args, permissions) => {
  return args.where?.company?.id?.equals === permissions.companyId
}

const findManyAction = (model) => async (resolve, parent, args, context, info) => {
  let result = []
  let argsWithDefault = args
  let canExecute = true
  const { permissions, userId } = context
  if (isPrivateModel(model)) {
    if (isCompanyModel(model)) {
      if (!isAuthCompanyInWhere(args, permissions)) {
        canExecute = false
      }
    } else {
      if (!isAuthUserInWhere(args, userId)) {
        canExecute = false
      }
    }
  } else if (isPublishableModel(model)) {
    if (isCompanyModel(model) && isAuthCompanyInWhere(args, permissions)) {
      argsWithDefault = {
        ...argsWithDefault,
        where: {
          ...argsWithDefault.where,
          OR: [{ published: true }, { company: { id: { equals: permissions.companyId } } }]
        }
      }
    } else {
      argsWithDefault = {
        ...argsWithDefault,
        where: {
          ...argsWithDefault.where,
          published: true
        }
      }
    }
  }
  if (canExecute) {
    result = await resolve(parent, argsWithDefault, context, info)
  }
  return result
}

// when private model request comes from user, it will come with a where query with user id
// when private model request comes from company, it wont come with a where query with company id, we should generate for them
schema.models.map((model) => {
  Query[`findMany${model.name}Count`] = findManyAction(model)
  Query[`findMany${model.name}`] = findManyAction(model)
})

const permissions = {
  Query,
  Mutation
}

export default permissions