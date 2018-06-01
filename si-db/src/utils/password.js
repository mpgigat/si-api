'use strict'

const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10)

module.exports = {
  generateHash: function (password) {
    return bcrypt.hashSync(password, salt)
  },
  compareHash: function (plainPassword, hashPassword) {
    return bcrypt.compareSync(plainPassword, hashPassword)
  }
}
