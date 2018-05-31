'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let db

module.exports = function (config) {
    if(!db) {
        db = mongoose.createConnection(config.uri, config.options)
    }
    return db
}