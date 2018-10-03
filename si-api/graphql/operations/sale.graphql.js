'use strict'

const db = require('../../../si-db')
const config = require('../../config')
const upload = require('../../upload')
const { verify } = require('../../auth')

const schema = `
    type Sale {
        _id: String!
        brand: String!
        category: String!
        subcategory: String!
        user: String!
        time: Int!
        state: State
        quantity: Int!
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
        category: String
        subcategority: String
        user: String!
        time: Int!
        quantity: Int!
        photos: [String]
        description: String!
    }

`
const register = async (_, { sale }) => {
  const photos = sale.photos
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
const findOne = async (_, {_id}) => {
  const database = await db(config.db)
  return database.sale.findOne(_id)
}

const getSalesOfCategory = async (_, {category}) => {
  const database = await db(config.db)
  return database.sale.getSalesOfCategory(category)
}


module.exports = {
  schema,
  register,
  getAll,
  findOne,
  getSalesOfCategory
}
