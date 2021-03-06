'use strict'

const Schema = require('mongoose').Schema

const userSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    document: String,
    name: {
        type: String,
        require: true
    },
    photo: {
        type: String
    }
})

module.exports = userSchema