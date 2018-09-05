'use strict'

const db = require('../../../si-db')
const config = require('../../config')

const schema = `
    type Bid {
        uuid: String!
        uuid_sale: String!
        uuid_article: String!
        values: [String]!
    }
    input newBid {
        uuid_sale: String!
        uuid_article: String!
        values: [String]!
    }

`
const register = async (_, { bid }) => {
  const database = await db(config.db)
  return database.bid.register(bid)
}
module.exports = {
  schema,
  register
}