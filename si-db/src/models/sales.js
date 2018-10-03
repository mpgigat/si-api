'use strict'

const Schema = require('mongoose').Schema

const saleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    brand: {
        type: String,
        require: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategory:{
        type: Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    creationTime: {
        type:Number,
        require: true
    },
    endTime: {
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
    value_end: Number,
    photos: [],
    description: {
        type: String,
        require: true
    }
})

module.exports = saleSchema