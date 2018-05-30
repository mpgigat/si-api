'use strict'

const Schema = require('mongoose').Schema

const saleSchema = new Schema({
    uuid: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    uuid_subcategority:{
        type: String,
        require: true
    },
    time: {
        type: Number,
        require:true
    },
    state: {
        type: String,
        enum: ['active', 'inactive', 'finalized', 'bought'],
        default: 'active',
        require: true
    },
    quantity: {
        type: Number,
        require: true,
    },
    uuid_user: {
        type: String,
        require: true
    },
    value_end: Number,
    photos: [],
    description: {
        type: String,
        require: true
    }
})

module.exports = saleSchema