const fs = require("fs")


class Contenedor {
    constructor(name) {
        this.name = name
    }

    async save (obj) {
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let contenidoJson = JSON.parse(contenido)
            let ultimoIndice = contenidoJson.length - 1
            let ultimoId = contenidoJson[ultimoIndice].id
            obj.id = ultimoId + 1
            let id = obj.id
            contenidoJson.push(obj)
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson) )
            return id
        }
        catch(err){
            console.log(err)
        }
    }

    async getById(id){
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let contenidoJson = JSON.parse(contenido)
            let contenidoArray
            contenidoJson.forEach(element => {
                if(element.id == id){
                    contenidoArray = element
                }
            });
            return contenidoArray

        }
        catch(err){
            console.log(err)
        }


    }

    async getAll(){
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let contenidoJson = JSON.parse(contenido)
            return contenidoJson
        }
        catch(err){
            console.log(err)
        }
        
    }

    async deleteById(id){
        try{
        let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8')
        let contenidoJson = JSON.parse(contenido)
        let delContenido = contenidoJson.filter((item) => item.id !== id)
        await fs.promises.writeFile(`./${this.name}`, JSON.stringify(delContenido))
        return delContenido
    }
    catch(err){
        console.log(err)
    }
    }

    async deleteAll(){
        try {
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let contenidoJson = JSON.parse(contenido)
            let noContenido = contenidoJson.length = 0
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(noContenido))
            return noContenido
        }
        catch(err){
            console.log(err)
        }
    }

} 

let contenedor = new Contenedor("productos.json")

let informacionNueva = {
        "id": 1,
        "tilte":"Producto 4",
        "price": 100
}

// contenedor.save(informacionNueva).then( res => {
//     console.log(res)
// })

// contenedor.getById(3).then( result => {
//     console.log(result)
// })

// contenedor.getAll().then( result => {
//     console.log(result)
// })

// contenedor.deleteById(1).then( result => {
//     console.log(result)
// })

// contenedor.deleteAll().then( result =>{
//     console.log(result)
// })