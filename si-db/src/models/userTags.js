'use strict'

const Schema = require('mongoose').Schema

const userTagSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    subcategory:{
        type: Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
})

module.exports = userTagSchema