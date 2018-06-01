'use strict'

const userArticleSchema = require('../models/userArticles')
const uuid = require('uuid')
let userArticleModel

module.exports = function(db) {
    userArticleModel = db.model('userArticle', userArticleSchema)

    const userArticleMethos = {}

    return userArticleMethos
}