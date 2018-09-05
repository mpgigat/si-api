'use strict'

const db = require('../../../si-db')
const config = require('../../config')

const schema = `
    type Sale {
        uuid: String!
        brand: String!
        uuid_subcategority: String!
        time: Int!
        state: State
        quantity: Int!
        uuid_user: String!
        value_end: Int
        photos: [String]
        description: String!
    }
    enum State {
        active
        inactive
        finalized
        bought
      }
    input newSale {
        brand: String!
        uuid_subcategority: String!
        time: Int!
        quantity: Int!
        uuid_user: String!
        photos: [String]
        description: String!
    }

`
const register = async (_, { sale }) => {
  const database = await db(config.db)
  return database.sale.register(sale)
}
const getSale = async (_, {}) => {
    
}
const getAll = async () => {
  const database = await db(config.db)
  return database.sale.getAll()
}
const findOne = async (_, {uuid}) => {
    const database = await db(config.db)
    return database.sale.findOne(uuid)
}

const getSalesOfCategory = async(_, {category_uuid}) => {
    const database = await db(config.db)
    return database.sale.getSalesOfCategory(category_uuid)
}

module.exports = {
  schema,
  register,
  getAll,
  findOne,
  getSalesOfCategory
}
