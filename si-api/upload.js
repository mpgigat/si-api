'use strict'
const path = require('path')
const fs = require('fs')
const { v4 } = require('uuid')
const domain = process.env.DOMAIN || 'http://localhost'
const port = process.env.port || '3300'

const get = str => str.split(/image/)[1].split(/;/)[0].replace('/', '.')

async function upload (req, res) {
  generatePath()
  if (req.photos) {
    const photos = req.photos
    try {
      const urls = await generateMultipleImages(photos)
      return urls
    } catch (e) {
      throw new Error(e.message)
    }
  } else {
    try {
      const { base64 } = req.body
      let url = await generateImage(base64)
      res.send({ url })
    } catch (err) {
      res.status(500).send({
        error: err.message
      })
    }
  }
}

function generateMultipleImages (imagesArr) {
  let imagenesPromises = imagesArr.map(base64 => generateImage(base64))
  return Promise.all(imagenesPromises)
}

function generateImage (image) {
  const name = v4()
  const extencion = get(image)
  image = image.split(';base64,').pop()
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, 'uploads', `${name}${extencion}`),
      image,
      { encoding: 'base64' },
      (err) => {
        if (err) reject(err.message)
        else resolve(`${domain}:${port}/uploads/${name}${extencion}`)
      })
  })
}

function generatePath (user) {
  let url = path.join(__dirname, 'uploads')
  if (!fs.existsSync(url)) {
    fs.mkdirSync(url)
  }
  // url = path.join(url, user)
  // if (!fs.existsSync(url)) {
  //   fs.mkdirSync(url)
  // }
  return url
}

module.exports = upload
