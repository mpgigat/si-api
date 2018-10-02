'use strict'

const mongoose = require('mongoose')
const categorySchema = require('../models/category')

let categoryModel

function register(categories) {
    let categoriesCreated = []
    categoriesCreated = categories.map(async (category) => {
        const categoryToCreate = new categoryModel()
        categoryToCreate._id = new mongoose.Types.ObjectId(),
        categoryToCreate.name = category.name
        categoryToCreate.picture = category.picture
        
        const categoryCreated = await categoryToCreate.save()
        return categoryCreated
    })
    categoriesCreated = Promise.all(categoriesCreated)
    return categoriesCreated 
}

module.exports = function(db) {
    categoryModel = db.model('category', categorySchema)

    const categoryMethods = {
        register
    }

    return categoryMethods
}