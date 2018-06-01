'use strict'

const db = require('../../../si-db')
const config = require('../../config')

const schema = `
    type User {
        uuid: String!
        email: String!
        username: String!
        password: String!
        city: String!
        phone: Int!
        document: Int!
        name: String!
    }
    input newUser {
        email: String!
        username: String!
        password: String!
        city: String!
        phone: Int!
        document: Int!
        name: String!
    }

`
const register = async (_, { user }) => {
  const database = await db(config.db)
  return database.user.register(user)
}
module.exports = {
  schema,
  register
}
