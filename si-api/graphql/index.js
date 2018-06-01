'use strict'

const { makeExecutableSchema } = require('graphql-tools')
// operations
const userGraphql = require('./operations/user.graphql')
// const config = require('./../config')
// const db = require('./../../si-db')

const schema = `
  ${userGraphql.schema}

  type Query {
    users: Int
  }

  type Mutation {
    createUser(user: newUser!): User
  }
`
const resolver = {
  Query: {

  },
  Mutation: {
    createUser: userGraphql.register
  }
}

module.exports = makeExecutableSchema({
  typeDefs: [schema],
  resolvers: resolver
})
