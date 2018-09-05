'use strict'
const path = require('path')
const fs = require('fs')

const get = str => str.split(/image/)[1].split(/;/)[0].replace('/', '.')

function upload (req, res) {
    const { imagenes } = req.body
    console.log(req)
    const name = v4()
    const image = base64.split(';base64,').pop()
    const extencion = get(imagenes)
    fs.writeFile(path.join(__dirname, '../', 'uploads', `${name}${extencion}`),
  image,
  { encoding: 'base64' },
  (err) => {
    if (err) {
      return res.status(500).send({
        error: err.message
      })
    }
    res.send({
      name: `${domain}:${port}/uploads/${name}${extencion}`
    })
  }
)
}

function generatePath (user) {
  let url = path.join(__dirname, 'uploads')
  if (!fs.existsSync(url)) {
    fs.mkdirSync(url)
  }
  url = path.join(url, user)
  if (!fs.existsSync(url)) {
    fs.mkdirSync(url)
  }
  return url
}

module.exports = upload
