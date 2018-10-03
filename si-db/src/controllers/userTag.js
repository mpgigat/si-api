'use strict'

const userTagSchema = require('../models/userTags')
const mongoose = require('mongoose')
let userTagModel

async function register (userTag) {

    const userTagToCreate = new userTagModel()

    userTagToCreate._id = new mongoose.Types.ObjectId()
    userTagToCreate.subcategory = userTag.subcategory
    userTagToCreate.user = userTag.user

    const userTagCreated = await userTagToCreate.save()

    return userTagCreated
}

module.exports = function(db) {
    userTagModel = db.model('userTag', userTagSchema)

    const userTagMethos = {}

    userTagMethos.register = register

    return userTagMethos
}