'use strict'

const db = require('../../../si-db')
const config = require('../../config')

const schema = `
    type Bid {
        uuid: String!
        uuid_sale: String!
        uuid_user: String!
        values: [String]!
    }
    input newBid {
        uuid_sale: String!
        uuid_user: String!
        values: [String]!
    }

`

const register = async (_, { bid }) => {
  const database = await db(config.db)
  return database.bid.register(bid)
}

const getBidsOfSale = async (_, { saleUuid }) => {
  const database = await db(config.db)
  return database.bid.getBidsOfSale(saleUuid)
}

module.exports = {
  schema,
  register,
  getBidsOfSale
}
