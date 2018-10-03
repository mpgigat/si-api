'use strict'

const Schema = require('mongoose').Schema

const bindSchema = new Schema({
    _id: Schema.Types.ObjectId,
    sale: {
        type: Schema.Types.ObjectId,
        ref: 'sale'
    },
    values: {
        type: [],
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'

    }
})

module.exports = bindSchema