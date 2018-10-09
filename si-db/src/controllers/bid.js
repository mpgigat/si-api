'use strict'

const mongoose = require('mongoose')
const bidSchema = require('../models/bids')
const userSchema = require('../models/users')
const saleSchema = require('../models/sales')

let bidModel, saleModel

async function register(bid) {
    const getBid = await bidModel.find({sale: bid.sale, user: bid.user})
    if(getBid === []) throw new Error('There is already a bid with this user')
    const sale = await saleModel.findById(bid.sale)
    if (sale.value_end <= bid.values) throw new Error('the value is greater than the existing ones')
    let values = { date: new Date(), value: bid.values }
    const bidToCreate = new bidModel()

    bidToCreate._id = new mongoose.Types.ObjectId(),
    bidToCreate.sale = bid.sale
    bidToCreate.values = values
    bidToCreate.user = bid.user
    const bidCreated = await bidToCreate.save()
    const saleUpdated = await saleModel.findByIdAndUpdate(bidCreated.sale, { value_end: bidCreated.values[bidCreated.values.length -1 ].value })

    return bidCreated
}

async function getBidsOfSale (sale) {
    let bids = await bidModel.find({sale})
    return bids
}
async function UpdateValue(_id, value){
    const createTime = new Date()
    const bidToUpdated = await bidModel.findById(_id)
    const sale = await saleModel.findById(bidToUpdated.sale)
    if (!bidToUpdated) throw new Error('bind not found')
    if(sale.value_end > value ){
        bidToUpdated.values.push({date: createTime, value})
        await bidModel.findByIdAndUpdate(_id, { values: bidToUpdated.values })
        await saleModel.findByIdAndUpdate(bidToUpdated.sale, { value_end: bidToUpdated.values[bidToUpdated.values.length -1 ].value })
        return bidToUpdated
    }
    throw new Error('the value is greater than the existing ones')

}

module.exports = function(db) {
    bidModel = db.model('bid', bidSchema)
    saleModel = db.model('sale', saleSchema)

    const bidMethods = {
        getBidsOfSale,
        register,
        UpdateValue
    }

    return bidMethods
}