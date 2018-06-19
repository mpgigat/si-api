'use strict'

const jwt = require('jsonwebtoken')

function sing (payload, secret, callback) {
  jwt.sign(payload, secret, callback)
}
function verify (token, secret, callback) {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err){
      throw new Error(err.message)
    } else {
      return decoded
    }
  })
}

module.exports = {
  sing,
  verify
}
