import { rule, shield, allow } from 'graphql-shield'
const getModelAndAction = (value) => {
  const actions = ['findOne', 'findMany', 'findMany', 'createOne', 'updateOne', 'updateMany', 'upsertOne', 'deleteOne', 'deleteMany']
  for (let index = 0; index < actions.length; index++) {
    const action = actions[index];
    if (value.startsWith(action)) {
      const model = value.replace(action, '')
      return {
        model,
        action
      }
    }
  }
  return { model: null, action: null }
}



const isPrivateModel = (model) => {
  for (let index = 0; index < schema.models.length; index++) {
    const schemaModel = schema.models[index];
    if (schemaModel.name === model) {
      const privateField = schemaModel.fields.find((field) => field.name === 'private')
      if (privateField) {
        return true
      }
    }
  }
  return false
}

// using 'published' and 'private' field in database to differentiate model access permission
// if a model has a 'published' field, means that the model is available to the public if published is true
// if a model has a 'private' field, means that the model is not available to the public and required userId or companyId
// to access
const PrivateModelGuard = rule('PrivateModelGuard', { cache: 'strict' })(async (parent, args, ctx, info) => {
  const { model, action } = getModelAndAction(info.operation.name?.value)
  if (!!model && !!action) {
    if (isPrivateModel(model)) {
      if (!ctx.userId && !ctx.permissions) {
        return false
      }
    }
  }
  return true
})

const permissions = shield({
  Query: {
    '*': PrivateModelGuard,
  },
  Mutation: {
    '*': allow
  }
})

export default permissions