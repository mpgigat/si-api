'use strict'

const dbConnection = require('./database-connection')
const defaults = require('defaults')
// controllers
const user = require('./src/controllers/user')
const userArticle = require('./src/controllers/UserArticle')
const userTag = require('./src/controllers/userTag')
const sale = require('./src/controllers/sale')
const bid = require('./src/controllers/bid')
const category = require('./src/controllers/category')
const subcategory = require('./src/controllers/subcategory')

module.exports = async function (config) {
  // configuracion por defecto
  config = defaults(config, {
    host: config.host,
    user: config.user,
    password: config.password,
    db: config.db,
    port: config.port,
    options: {
      autoIndex: true, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0
    }
  })
  const connectConfig = {}

  connectConfig.uri = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.db}`
  // connectConfig.uri = config.db.mongoUri

  connectConfig.options = config.options

  const db = await dbConnection(connectConfig)

  return {
    user: user(db),
    userArticle: userArticle(db),
    userTag: userTag(db),
    sale: sale(db),
    bid: bid(db),
    category: category(db),
    subcategory: subcategory(db)

  }
}