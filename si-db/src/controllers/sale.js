'use strict'

const mongoose = require('mongoose')
const saleSchema = require('../models/sales')
const bidSchema = require('../models/bids')

let saleModel
let bidModel

async function register (sale) {
    let createTime = new Date()
    const saleToCreate = new saleModel()

    saleToCreate._id = new mongoose.Types.ObjectId()
    saleToCreate.brand = sale.brand
    saleToCreate.subcategory = sale.subcategory
    saleToCreate.category = sale.category
    saleToCreate.creationTime = createTime.getTime()
    saleToCreate.endTime = createTime.setDate(createTime.getDate() + sale.time)
    saleToCreate.quantity = sale.quantity
    saleToCreate.user = sale.user
    saleToCreate.photos = sale.photos
    saleToCreate.description = sale.description

    const saleCreated = await saleToCreate.save()

    return saleCreated
}
async function getAll () {
    const sales = await saleModel.find({})
    return sales
}
async function findOne(_id) {
    const sale = await saleModel.findOne({
        _id
    })
    if (sale) return sale
    throw new Error ('The sale with that _id is not registered')
}
async function getSalesOfCategory (category) {
    const sales = await saleModel.find({ category })
    return sales
}
async function getSalesOfBidUser (user) {
    const bids = await bidModel.find({ user }).populate('sale').exec()
    if (bids === []) throw new Error ('the user has not created bids')
    let sales = []
    bids.forEach(({ sale }) => {
        sales.push(sale)
    })
    return sales
}
async function  getSaleOfUser (user) {
    const sales = await saleModel.find({ user })
    if (sales === []) throw new Error ('the user has not created sale')
    return sales
}

module.exports = function(db) {
    saleModel = db.model('sale', saleSchema)
    bidModel = db.model('bid', bidSchema)
    const saleMethods = {
        register,
        getAll,
        findOne,
        getSalesOfCategory,
        getSalesOfBidUser,
        getSaleOfUser
    }
    return saleMethods
}