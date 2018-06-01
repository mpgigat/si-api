'use strict'

const userTagSchema = require('../models/userTags')
const uuid = require('uuid')
let userTagModel

module.exports = function(db) {
    userTagModel = db.model('userTag', userTagSchema)

    const userTagMethos = {}

    return userTagMethos
}