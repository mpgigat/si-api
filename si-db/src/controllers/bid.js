'use strict'

const mongoose = require('mongoose')
const bidSchema = require('../models/bids')
const userSchema = require('../models/users')
const saleSchema = require('../models/sales')

const uuid = require('uuid')
let bidModel

async function register(bid) {

    const bidToCreate = new bidModel()

    bidToCreate._id = new mongoose.Types.ObjectId(),
    bidToCreate.sale = bid.sale
    bidToCreate.values = bid.values
    bidToCreate.user = bid.user
    const bidCreated = await bidToCreate.save()

    return bidCreated
}

async function getBidsOfSale (sale) {
    console.log(sale)
    let bids = await bidModel.find({sale})
    return bids
}

module.exports = function(db) {
    bidModel = db.model('bid', bidSchema)

    const bidMethods = {
        getBidsOfSale,
        register
    }

    return bidMethods
}