'use strict'

module.exports = {
  db: {
    host: process.env.DBHOST || 'ds139970.mlab.com',
    user: process.env.DBUSER || 'heroku_q7s5vqw0',
    password: process.env.DBPASSWORD || '5dn3jg97nvmq6qd1a66iu1u4ud',
    db: process.env.DBNAME || 'heroku_q7s5vqw0',
    port: process.env.DBPORT || 39970
  },
  secret: process.env.SECRET || 'subastainversa'
}
