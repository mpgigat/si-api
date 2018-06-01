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
        phone: String!
        document: String!
        name: String!
    }
    input newUser {
        email: String!
        username: String!
        password: String!
        city: String!
        phone: String!
        document: String!
        name: String!
    }

`
const register = async (_, { user }) => {
  const database = await db(config.db)
  return database.user.register(user)
}
const login = async (_, { email, password }) => {
  const { user } = await db(config.db)
  return user.singin(email, password)
}
module.exports = {
  schema,
  register,
  login
}
