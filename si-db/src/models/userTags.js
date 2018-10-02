'use strict'

const Schema = require('mongoose').Schema

const userTagSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    uuid_subcategority:{
        type: String,
        require: true
    },
    uuid_user: {
        type: String,
        require: true
    },
})

module.exports = userTagSchema