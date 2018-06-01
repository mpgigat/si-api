'use strict'

const userTagSchema = require('../models/userTags')
const uuid = require('uuid')
let userTagModel

async function register (userTag) {
    userTag.uuid = uuid.v4()

    let invalidUserTag = null
    invalidUserTag = await userTagModel.findOne({ uuid: userTag.uuid })

    while (invalidUserTag) {
        invalidUserTag = null
        userTag.uuid = uuid.v4()
        invalidUserTag = await userTagModel.findOne({ uuid: userTag.uuid })
    }

    const userTagToCreate = new userTagModel()

    userTagToCreate.uuid = userTag.uuid
    userTagToCreate.uuid_subcategority = userTag.uuid_subcategority
    userTagToCreate.uuid_user = userTag.uuid_user

    const userTagCreated = await userTagToCreate.save()

    return userTagCreated
}

module.exports = function(db) {
    userTagModel = db.model('userTag', userTagSchema)

    const userTagMethos = {}

    userTagMethos.register = register

    return userTagMethos
}