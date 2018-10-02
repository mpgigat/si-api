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
    bidToCreate.sale = bid._idSale
    bidToCreate.values = bid.values
    bidToCreate.user = bid._idUser

    const bidCreated = await bidToCreate.save()

    return bidCreated
}

async function getBidsOfSale (uuid_sale) {
    let bids = await bidModel.find({uuid_sale})
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