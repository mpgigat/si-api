'use strict'

const bidSchema = require('../models/users')
const uuid = require('uuid')
let bidModel

async function register(bid) {
    bid.uuid = uuid.v4()

    let invalidBid = null
    invalidBid = await bidModel.findOne({ uuid: bid.uuid })

    while (invalidBid) {
        invalidBid = null
        userTag.uuid = uuid.v4()
        invalidBid = await bidModel.findOne({ uuid: bid.uuid })
    }

    const bidToCreate = new bidModel()

    bidToCreate.uuid = bid.uuid
    bidToCreate.uuid_sale = bid.uuid_sale
    bidToCreate.values = bid.values
    bidToCreate.uuid_article = bid.uuid_article

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