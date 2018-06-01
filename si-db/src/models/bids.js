'use strict'

const Schema = require('mongoose').Schema

const bindSchema = new Schema({
    uuid: {
        type: String,
        require: true
    },
    uuid_sale: {
        type: String,
        require: true
    },
    values: {
        type: [],
        require: true
    },
    uuid_article: {
        type: String,
        require: true
    }
})

module.exports = bindSchema