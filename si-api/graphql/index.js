'use strict'

const { makeExecutableSchema } = require('graphql-tools')
// operations
const userGraphql = require('./operations/user.graphql')
const userArticleGraphql = require('./operations/userArticle.graphql')
const userTasgGraphql = require('./operations/userTag.graphql')
const saleGraphql = require('./operations/sale.graphql')
const bidGraphql = require('./operations/bid.graphql')

const schema = `
  ${userGraphql.schema}
  ${userArticleGraphql.schema}
  ${userTasgGraphql.schema}
  ${saleGraphql.schema}
  ${bidGraphql.schema}

  type Query {
    user: [User]
  }

  type Mutation {
    singin(email: String!, password: String!): User
    createUser(user: newUser!): User
    createUserArticle(userArticle: newUserArticle!): UserArticle
    createUserTag(userTag: newUserTag!): UserTag
    createSale(sale: newSale): Sale
    createBid(bid: newBid!): Bid
  }
`
const resolver = {
  Query: {

  },
  Mutation: {
    singin: userGraphql.login,
    createUser: userGraphql.register,
    createUserArticle: userArticleGraphql.register,
    createUserTag: userTasgGraphql.register,
    createSale: saleGraphql.register,
    createBid: bidGraphql.register
  }
}

module.exports = makeExecutableSchema({
  typeDefs: [schema],
  resolvers: resolver
})
