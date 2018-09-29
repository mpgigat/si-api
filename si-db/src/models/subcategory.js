'use strict'

const Schema = require('mongoose').Schema

const subcategorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    name: {
        type: String,
        require: true
    },
    picture: {
        type: String,
    }
})

module.exports = subcategorySchema