const firebase = require('firebase')
const { v4 } = require('uuid')

const config = {
  apiKey: 'AIzaSyDJSVESjGBGI7XpqTWEWA-3cA04FjqSJNk',
  authDomain: 'subasta-63c4c.firebaseapp.com',
  databaseURL: 'https://subasta-63c4c.firebaseio.com',
  storageBucket: 'subasta-63c4c.appspot.com'
}
firebase.initializeApp(config)
let storage = firebase.storage()
let storageRef = storage.ref()

const getExtencion = str => str.split(/image/)[1].split(/;/)[0].replace('/', '.')

function upload (req, res) {
  if (req.photos) {
    const photos = req.photos
    try {
      const urls = await generateMultipleImages(photos)
      return urls
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

function generateMultipleImages(images) {
  let imagenesPromises = images.map(base64 => saveImage(base64))
  return Promise.all(imagenesPromises)
}
function saveImage(image){
  const name = generateName()
  const extencion = getExtencion(image)
  storageRef = storage.ref(`images/${name}.${extencion}`)
  return new Promise( (resolve, reject) => {
    storageRef.putString(image, 'data_url')
    
  })

}
function generateName () {
  const name = v4()
  return name
}
