'use strict'
module.exports = {
  db: {
    host: process.env.DBHOST || 'ds139970.mlab.com',
    user: process.env.DBUSER || 'heroku_q7s5vqw0',
    password: process.env.DBPASSWORD || '5dn3jg97nvmq6qd1a66iu1u4ud',
    db: process.env.DBNAME || 'heroku_q7s5vqw0',
    port: process.env.DBPORT || 39970,
    mongoUri: process.env.MONGODB_URI
  },
  secret: process.env.SECRET || 'subastainversa',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpzYXJpYXM5OEBtaXNlbmEuZWR1LmNvIiwidXNlcm5hbWUiOiJqc2FyaWFzIiwiY2l0eSI6InNhbiBnaWwiLCJwaG9uZSI6IjMxMjM1MTM5MzAiLCJkb2N1bWVudCI6IjExMDA5NjA0ODkiLCJuYW1lIjoiamhvYW4gc2ViYXN0aWFuIGFyaWFzIHB1bGlkbyIsImlhdCI6MTUzODM5OTE4M30.iQIXwouZcqhK4NEw4W-V7zGch9FGSiqil1Uxr-V8QX0'
}
