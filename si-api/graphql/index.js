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
    users: [User]
    sales: [Sale]
    findOneSale(uuid: String!): Sale
    getBidsOfSale(saleUuid: String!): [Bid]
    getSalesOfCategory(categoryUuid: String!): [Sale]
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
const resolvers = {
  Query: {
    users: userGraphql.getAll,
    sales: saleGraphql.getAll,
    findOneSale: saleGraphql.findOne,
    getBidsOfSale: bidGraphql.getBidsOfSale,
    getSalesOfCategory: saleGraphql.getSalesOfCategory
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
  resolvers
})
