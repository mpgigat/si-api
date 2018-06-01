'use strict'

const userSchema = require('../models/users')
const uuid = require('uuid')
const passwordCrypt = require('../utils/password')
let userModel

async function validateEmail(user, update, uuid) {
    let invalidUser = null
    let cond = []
    if (!update) {
      cond = [
        { email: user.email },
      ]
    } else {
      cond = [
        { email: user.email },
      ]
    }
    invalidUser = await userModel.findOne({ $or: cond })
  
    if (invalidUser) {
      if (update && invalidUser.uuid === uuid) {
        return
      }
      throw new Error(`La dirección de correo: ${cond[0].email} ya esta registrada`)
    }
}

async function register(user) {
    await validateEmail(user, false)

    user.uuid = uuid.v4()

    let invalidUser = null
    invalidUser = await userModel.findOne({ uuid: user.uuid })

    while (invalidUser) {
        invalidUser = null
        user.uuid = uuid.v4()
        invalidUser = await userModel.findOne({ uuid: user.uuid })
    }
    const userToCreate = new userModel()

    userToCreate.uuid = user.uuid
    userToCreate.email = user.email
    userToCreate.username = user.username
    userToCreate.password = passwordCrypt.generateHash(user.password)
    userToCreate.city = user.city
    userToCreate.phone = user.phone
    userToCreate.document = user.document
    userToCreate.name = user.name

    const userCreated = await userToCreate.save()

    return userCreated
}

module.exports = function(db) {
    userModel = db.model('user', userSchema)

    const userMethos = {}

    userMethos.register = register

    return userMethos
}