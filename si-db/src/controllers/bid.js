'use strict'

const bidSchema = require('../models/users')
const uuid = require('uuid')
let bidModel

module.exports = function(db) {
    bidModel = db.model('bid', bidSchema)

    const bidMethos = {}

    return bidMethos
}