'use strict'

const saleSchema = require('../models/sales')
const uuid = require('uuid')
let saleModel

module.exports = function(db) {
    saleModel = db.model('sale', saleSchema)

    const saleMethos = {}

    return saleMethos
}