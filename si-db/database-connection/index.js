'use strict'

import mongoose from 'mongoose'

mongoose.Promise = global.Promise

let db

export default function (config) {
    if(!db) {
        db = mongoose.createConnection(config.uri, config.options)
    }
    return db
}