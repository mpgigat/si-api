'use strict'

const db = require('../../../si-db')
const config = require('../../config')

const schema = `
    type Subcategory {
        _id: String!
        category: String!
        name: String!
        picture: String!
    }
    input newSubcategories {
        category: String!
        name: String!
        picture: String
    }

`
const register = async (_, { subcategories }, context) => {
  const database = await db(config.db)
  return database.subcategory.register(subcategories)
}
module.exports = {
  schema,
  register
}
