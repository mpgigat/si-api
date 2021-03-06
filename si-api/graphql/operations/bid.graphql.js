'use strict'

const db = require('../../../si-db')
const config = require('../../config')

const schema = `
    type Value {
      date: Float
      value: Int
    }
    type Bid {
        _id: String!
        sale: String!
        user: String!
        values: [Value]!
    }
    input newBid {
        sale: String!
        user: String!
        values: Int!
    }
    

`
const register = async (_, { bid }) => {
  const database = await db(config.db)
  return database.bid.register(bid)
}

const getBidsOfSale = async (_, { sale }) => {
  const database = await db(config.db)
  return database.bid.getBidsOfSale(sale)
}
const UpdateOfValue = async (_, { _id, value }) => {
  const database = await db(config.db)
  return database.bid.UpdateValue(_id, value)
}

module.exports = {
  schema,
  register,
  getBidsOfSale,
  UpdateOfValue
}
