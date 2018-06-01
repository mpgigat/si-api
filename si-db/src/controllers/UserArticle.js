'use strict'

const userArticleSchema = require('../models/userArticles')
const uuid = require('uuid')
let userArticleModel

async function register (userArticle) {
    userArticle.uuid = uuid.v4()
    let invalidUserArticle = null
    invalidUserArticle = await userArticleModel.findOne({ uuid: userArticle.uuid })

    while (invalidUserArticle) {
        invalidUserArticle = null
        userArticle.uuid = uuid.v4()
        invalidUserArticle = await userArticleModel.findOne({ uuid: userArticle.uuid })
    }

    const userArticleToCreate = new userArticleModel()

    userArticleToCreate.uuid = userArticle.uuid
    userArticleToCreate.uuid_subcategority = userArticle.uuid_subcategority
    userArticleToCreate.uuid_user = userArticle.uuid_user
    userArticleToCreate.description = userArticle.description

    const userArticleCreated = await userArticleToCreate.save()

    return userArticleCreated
}

module.exports = function(db) {
    userArticleModel = db.model('userArticle', userArticleSchema)

    const userArticleMethos = {}

    userArticleMethos.register = register

    return userArticleMethos
}