'use strict'

const Schema = require('mongoose').Schema

const userArticleSchema = new Schema ({
    uuid: {
        type: String,
        require: true
    },
    uuid_subcategority:{
        type: String,
        require: true
    },
    uuid_user: {
        type: String,
        require: true
    },
    photos: [],
    description: {
        type: String,
        require: true
    }
})

module.exports = userArticleSchema