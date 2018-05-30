'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const config = require('./../config')
const db = require('./../../si-db')

const schema = `
  type Query {
    users: Int
  }

  type Mutation {
    createUser(id: Int): Int
  }
`
const resolver = {
  Query: {

  },
  Mutation: {

  }
}

module.exports = makeExecutableSchema({
  typeDefs: [schema],
  resolvers: resolver
})