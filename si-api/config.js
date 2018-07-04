'use strict'
module.exports = {
  db: {
    host: process.env.DBHOST || 'ds139970.mlab.com',
    user: process.env.DBUSER || 'heroku_q7s5vqw0',
    password: process.env.DBPASSWORD || '5dn3jg97nvmq6qd1a66iu1u4ud',
    db: process.env.DBNAME || 'heroku_q7s5vqw0',
    port: process.env.DBPORT || 39970
  },
  secret: process.env.SECRET || 'subastainversa',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYTYzODM0YTctMjczNC00NGE2LWFlOTctOTZkZjdiNDk0NTNlIiwiZW1haWwiOiJqc2FyaWFzOThAbWlzZW5hLmVkdS5jbyIsInVzZXJuYW1lIjoianNhcmlhczk4IiwiY2l0eSI6InNhbiBnaWwiLCJwaG9uZSI6IjMxIiwiZG9jdW1lbnQiOiIxMTAwOTYwNDg5IiwibmFtZSI6Impob2FuIHNlYmFzdGlhbiBhcmlhcyBwdWxpZG8iLCJpYXQiOjE1Mjk3MDA5OTN9.zZduZDrz63T9p7ii1dFuw41BB0Htk5YzEkIgEBYZxSA'
}
