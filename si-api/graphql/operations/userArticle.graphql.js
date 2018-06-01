'use strict'

const db = require('../../../si-db')
const config = require('../../config')

const schema = `
    type UserArticle {
        uuid: String!
        uuid_subcategority: String!
        uuid_user: String!
        photos: [String]
        description: String!
    }
    input newUserArticle {
        uuid_subcategority: String!
        uuid_user: String!
        photos: [String]
        description: String!
    }

`
const register = async (_, { userArticle }) => {
  const database = await db(config.db)
  return database.userArticle.register(userArticle)
}
module.exports = {
  schema,
  register
}
