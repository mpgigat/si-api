const btn = document.querySelector('input[type=button]')
const file = document.querySelector('input[type=file]')
const preview = document.querySelector('img')
let imagenes = []
function previewFile() {
    var reader  = new FileReader()
    reader.onloadend = function () {
        preview.src = reader.result
        imagenes.push(reader.result)
        imagenes.push(reader.result)
        imagenes.push(reader.result)
    }
    if (file) {
        reader.readAsDataURL(file.files[0]);
    } else {
        preview.src = ""
    }
}

btn.addEventListener('click', () => {
    const bodyObj = {imagenes:imagenes}
    const body = JSON.stringify(bodyObj)
    console.log(imagenes)
    fetch('http://localhost:3300/upload',{
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        }
    }).then(res => res.json()).then(console.log)
});
 function datos(){
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
