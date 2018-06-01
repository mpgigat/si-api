'use strict'

const Schema = require('mongoose').Schema

const userSchema = new Schema ({
    uuid: {
        type: String,
        require: true
    },
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
        type: Number,
        require: true
    },
    document: Number,
    name: {
        type: String,
        require: true
    }
})

module.exports = userSchema