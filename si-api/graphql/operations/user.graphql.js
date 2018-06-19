'use strict'

const db = require('../../../si-db')
const config = require('../../config')
const { sing } = require('../../auth')

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
        token: String
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
  let result = await user.singin(email, password)
  if (!result.Error) {
    const sesion = {
      uuid: result.uuid,
      email: result.email,
      username: result.username,
      city: result.city,
      phone: result.phone,
      document: result.document,
      name: result.name
    }
    let token = new Promise((resolve, reject) => {
      sing(sesion, config.secret, (error, token) => {
        if (error) {
          return reject(error)
        }
        return resolve(token)
      })
    })
    token = await token
    result.token = token
  }
  return result
}
module.exports = {
  schema,
  register,
  login
}
