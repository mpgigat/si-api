'use strict'

const mongoose = require('mongoose')
const userSchema = require('../models/users')
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

    const userToCreate = new userModel()

    userToCreate._id = new mongoose.Types.ObjectId(),
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

async function singin(userEmail, userPassword) {
  
  let dataFail = 'datos incorrectos'
  const result = await userModel.findOne({email: userEmail})
  
  if (!result) {
    throw new Error('No se encuentra ningún usuario registrado con este email')
  }
  const user = result.toJSON()
  if (!(passwordCrypt.compareHash(userPassword, user.password))) {
    throw new Error('Los datos de ingreso no coinciden')
  }
  return user
}

module.exports = function(db) {
    userModel = db.model('user', userSchema)

    const userMethos = {}

    userMethos.register = register
    userMethos.singin = singin

    return userMethos
}