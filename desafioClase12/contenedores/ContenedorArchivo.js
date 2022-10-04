const { promises: fs } = require('fs');

class ContenedorArchivo {

    constructor(ruta){
        this.ruta = ruta;
    }

    async list(id) {
        const objs = await this.listAll()
        const encontrar = objs.find(o => o.id == id)
        return encontrar
    }

    async listAll() {
        try{
            const objs = await fs.readFile(this.ruta, 'utf-8');
            return JSON.parse(objs)
        } catch (err){
            return[]
        }
    }

    async save(obj) {
        const objs = await this.listAll();

        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }

        const newObj = {...obj, id: newId}
        objs.push(newObj)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newId
        } catch (err) {
        return(err);
    }
    }

    async supdate(elem, id) {
        const objs = await this.listAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error: no se encontró el id ${id}`)
        } else {
            objs [index] = elem
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs,null,2))
            } catch (err) {
                return (err)
            }
        }
    }

    async del(id) {
        const objs = await this.listAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        objs.splice(index, 1)
        try {
            await fs.readFile(this.ruta, JSON.stringify(objs,null,2))
        } catch (err) {
            return(err)
        }
    }

    async delAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([],null,2))
        } catch (err) {
            return (err)
        }
    }
}

module.exports = ContenedorArchivo