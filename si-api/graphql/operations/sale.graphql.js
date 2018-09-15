'use strict'

const db = require('../../../si-db')
const config = require('../../config')
const upload = require('../../upload')

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
  const photos = sale.photos
  console.log(photos)
  let photoUrls = await upload({photos})
  sale.photos = photoUrls
  const database = await db(config.db)
  return database.sale.register(sale)
}
// const getSale = async (_, {}) => {

// }
const getAll = async () => {
  const database = await db(config.db)
  return database.sale.getAll()
}
const findOne = async (_, {uuid}) => {
  const database = await db(config.db)
  return database.sale.findOne(uuid)
}

const getSalesOfCategory = async (_, {categoryUuid}) => {
  const database = await db(config.db)
  return database.sale.getSalesOfCategory(categoryUuid)
}

module.exports = {
  schema,
  register,
  getAll,
  findOne,
  getSalesOfCategory
}
