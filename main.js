const btn = document.querySelector('input[type=button]')
const file = document.querySelector('input[type=file]')
const preview = document.querySelector('img')
let imagenes = []
function previewFile() {
    var reader  = new FileReader()
    reader.onloadend = function () {
        preview.src = reader.result
        imagenes.push(reader.result)
    }
    if (file) {
        reader.readAsDataURL(file.files[0]);
    } else {
        preview.src = ""
    }
}

btn.addEventListener('click', () => {
    const bodyObj = {query: `
    mutation {
      createSale(sale: {
        brand: "adidas"
        uuid_subcategority: "prueba"
        time: 1
        uuid_user: "1"
        photos: ""
        description: "nada"
        quantity: 10000
      }) {
        uuid
        brand
        uuid_subcategority
        time
        state
        value_end
        quantity
        uuid_user
        photos
        description
      }
    }
    `}
    const body = JSON.stringify(bodyObj)
    console.log(imagenes)
    fetch('http://localhost:3300/upload',{
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        }
    }).then(res => res.json())
})