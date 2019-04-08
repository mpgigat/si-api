const btn = document.querySelector('input[type=button]')
const file = document.querySelector('input[type=file]')
const preview = document.querySelector('img')
let imagenes = []
function previewFile() {
    var reader  = new FileReader()
    reader.onloadend = function () {
        preview.src = reader.result
        imagenes.push(reader.result)
        // imagenes.push(reader.result)
        // imagenes.push(reader.result)
        console.log(imagenes)
    }
    if (file) {
        reader.readAsDataURL(file.files[0]);
    } else {
        preview.src = ""
    }
}
var config = {
    apiKey: "AIzaSyDJSVESjGBGI7XpqTWEWA-3cA04FjqSJNk",
    authDomain: "subasta-63c4c.firebaseapp.com",
    databaseURL: "https://subasta-63c4c.firebaseio.com",
    projectId: "subasta-63c4c",
    storageBucket: "subasta-63c4c.appspot.com",
    messagingSenderId: "29386136647"
  }
firebase.initializeApp(config)
let storage = firebase.storage()


const get = str => str.split(/image/)[1].split(/;/)[0].replace('/', '.')


btn.addEventListener('click', async () => {
    const extencion = get(imagenes[0])
    let storageRef = storage.ref(`images/prueba${extencion}`)
    // const bodyObj = {imagenes:imagenes}
    // const body = JSON.stringify(bodyObj)
    // // let image = imagenes[0].split(';base64,').pop()
    // console.log(imagenes[0])
    const imgUpload = storageRef.putString(imagenes[0], 'data_url')
    console.log(imgUpload)
    imgUpload.on('state_changed', function progress (img) {
        let progress = (img.bytesTransferred / img.totalBytes) * 100
        console.log(progress)
    })
    // const url = await imgUpload.snapshot.ref.getDownloadURL()
    // console.log(url)
    // const data = await storageRef.getDownloadURL()
    // console.log('imagen subida', data)

    // fetch('http://localhost:3300/upload',{
    //     method: 'POST',
    //     body,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept':'application/json'
    //     }
    // }).then(res => res.json()).then(console.log)
});
 async function datos(){
    let headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    }
    let init = {
        method: 'POST',
        ...headers,
    }
    let mutation, data
    // let method = 'POST'
    const datas = await fetch('https://api.mercadolibre.com/sites/MLC/categories', {headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
    }}).then(res => res.json())
    datas.forEach(async el => {
        mutation = `mutation{
            createCategority(categories: {
              name:"${el.name}",
            }){
              name
              _id
            }
          }`
        data = mutation
        init.body = JSON.stringify({query: data})
        const {data:{createCategority: [category]}} = await fetch('http://localhost:3300/graphql', init).then(res => res.json())
        const subcategory = await fetch(`https://api.mercadolibre.com/categories/${el.id}`).then(res=> res.json())
        subcategory.children_categories.forEach(async el => {
            mutation = `mutation{
                createSubcategority(subcategories: {
                  category:"${category._id}",
                  name:"${el.name}",
                }){
                  name
                }
              }`
            data = mutation
            init.body = JSON.stringify({query: data})
            const sub = await fetch('http://localhost:3300/graphql', init).then(res => res.json())
        })
        
    })

}
