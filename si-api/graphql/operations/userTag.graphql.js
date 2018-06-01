'use strict'

const db = require('../../../si-db')
const config = require('../../config')

const schema = `
    type UserTag {
        uuid: String!
        uuid_subcategority: String!
        uuid_user: String!
    }
    input newUserTag {
        uuid_subcategority: String!
        uuid_user: String!
    }

`
const register = async (_, { userTag }) => {
  const database = await db(config.db)
  return database.userTag.register(userTag)
}
module.exports = {
  schema,
  register
}
