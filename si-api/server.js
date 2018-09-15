'use strict'

const bodyParser = require('body-parser')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const upload = require('./upload')
const chalk = require('chalk')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./graphql')
const port = process.env.PORT || 3300
const app = asyncify(express())
const server = http.createServer(app)
const { token } = require('./config')
const path = require('path')

app.use((req, res, next) => {
  console.log(req)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  return next()
})
app.use(bodyParser.json({ limit: '10mb' }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/graphql', graphqlOptionsMethod, graphqlExpress(req => {
  req.headers.authorization = req.headers.authorization || token
  return {schema, context: req.headers}
}))

app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

app.post('/upload', upload)
function graphqlOptionsMethod (req, res, next) {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
}

app.use((err, req, res, next) => {
  if (err.message.match(/not found/)) {
    return res.status(404).send({
      error: err.message
    })
  }

  res.status(500).send({
    error: err.message
  })
})

server.listen(port, () => {
  console.log(`${chalk.blue('[SI:API]:')} server is running at: ${chalk.blue('http://localhost:' + port + '/graphql')}`)
})
