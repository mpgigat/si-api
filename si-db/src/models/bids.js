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
    sale: {
        type: Schema.Types.ObjectId, ref: 'sale'
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