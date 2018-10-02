'use strict'

const mongoose = require('mongoose')
const subcategorySchema = require('../models/subcategory')

let subcategoryModel

function register(subcategories) {
    let subcategoriesCreated = []
    subcategoriesCreated = subcategories.map(async subcategory => {
        const subcategoryToCreate = new subcategoryModel()
    
        subcategoryToCreate._id = new mongoose.Types.ObjectId(),
        subcategoryToCreate.name = subcategory.name
        subcategoryToCreate.category = subcategory.category
        subcategoryToCreate.picture = subcategory.picture
        
        const subcategorityCreated = await subcategoryToCreate.save()
        return subcategorityCreated
    })
    subcategoriesCreated = Promise.all(subcategoriesCreated)
    return subcategoriesCreated
}

module.exports = function(db) {
    subcategoryModel = db.model('subcategory', subcategorySchema)

    const subcategoryMethods = {
        register
    }

    return subcategoryMethods
}