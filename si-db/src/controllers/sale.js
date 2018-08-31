'use strict'

const saleSchema = require('../models/sales')
const uuid = require('uuid')
let saleModel

async function register (sale) {
    sale.uuid = uuid.v4()
    let invalidSale= null
    invalidSale = await saleModel.findOne({ uuid: sale.uuid })

    while (invalidSale) {
        invalidSale = null
        userTag.uuid = uuid.v4()
        invalidSale = await saleModel.findOne({ uuid: sale.uuid })
    }
    const saleToCreate = new saleModel()

    saleToCreate.uuid = sale.uuid
    saleToCreate.brand = sale.brand
    saleToCreate.uuid_subcategority= sale.uuid_subcategority
    saleToCreate.time = sale.time
    //saleToCreate.state = sale.state
    saleToCreate.quantity = sale.quantity
    saleToCreate.uuid_user = sale.uuid_user
    saleToCreate.photos = sale.photos
    saleToCreate.description = sale.description

    const saleCreated = await saleToCreate.save()

    return saleCreated
}
async function getAll () {
    const sales = await saleModel.find({})
    return sales
}
async function findOne(uuid) {
    const sale = await saleModel.findOne({
        uuid
    })
    if (sale) return sale
    throw new Error ('The sale with that uuid is not registered')
}
async function getSalesOfCategory (categoryUuid) {
    const sales = await saleModel.find({
        uuid_subcategority: categoryUuid
    })
    return sales
}
module.exports = function(db) {
    saleModel = db.model('sale', saleSchema)
    const saleMethods = {
        register,
        getAll,
        findOne,
        getSalesOfCategory
    }
    return saleMethods
}