'use strict'

const db = require('../../../si-db')
const config = require('../../config')

const schema = `
    type Category {
        _id: String!
        name: String!
        picture: String!
    }
    input newCategories {
        name: String!
        picture: String
    }

`
const register = async (_, { categories }, context) => {
  const database = await db(config.db)
  return database.category.register(categories)
}
module.exports = {
  schema,
  register
}
