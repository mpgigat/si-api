'use strict'

const Schema = require('mongoose').Schema

const categorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    picture:{
        type: String
    }
})


module.exports = categorySchema