'use strict'

const db = require('../../../si-db')
const config = require('../../config')

const schema = `
    type Category {
        _id: String!
        name: String!
        picture: String!
        subcategories: [Subcategory]
    }
    input newCategories {
        name: String!
        picture: String
    }

`
const register = async (_, { categories }, context) => {
  const database = await db(config.db)
  return database.category.register(categories)
}

const getAll = async () =>{
  const database = await db(config.db)
    let data = await database.category.getAll()    
    console.log(data)
    return data
}

module.exports = {
  schema,
  register,
  getAll
}
