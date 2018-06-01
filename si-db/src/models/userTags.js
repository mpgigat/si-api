'use strict'

const Schema = require('mongoose').Schema

const userTagSchema = new Schema ({
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
})

module.exports = userTagSchema