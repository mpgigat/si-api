'use strict'

import dbConnection from './database-connection'
import defaults from 'defaults'

export default async function (config) {
  // configuracion por defecto
  config = defaults(config, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    db: 'subasta-inversa',
    port: 27017,
    options: {
      useMongoClient: true,
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
  connectConfig.options = config.options

  const db = await dbConnection(connectConfig)

  return {

  }
}