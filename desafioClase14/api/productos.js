const { promises: fs} = require('fs');
const listproducts = './productslist/data.json';

class ApiProductos {

    constructor(){
        this.productos = listproducts;
    }

    listProds = async () => {
        const prods =  await fs.readFile(this.productos, 'utf-8');
        const allProds = await JSON.parse(prods);
        return allProds
    }

    saveProds = async (prods) => {
        const prod = JSON.stringify(prods, null, 2);
        await fs.writeFile(this.productos, prod, 'utf-8')
    }

    getAll = async(req,res) => {
        const prods = await this.listProds();
        return res.send(prods.products);
    }

    getById = async (req,res) => {
        const prods = await this.listProds();
        const { id } = req.params
        const product = prods.products.find(product => product.id === +id);
        if (!product) {
            return res.status(404).json({ success: false, error: `El producto de id ${id} no fue encontrado`});
        }
        return res.send({ success: true, result: product })
    }

    save = async (req,res) => {
        const data = await this.listProds();
        const {name, price, description, thumbnail, code, stock} = req.body;

        if( !name || !price || !description || !thumbnail || !code || !stock) {
            return res.status(400).json({ success: false, error: 'Hay algun dato incorrecto y/o faltante'})
        }
            const prodNuevo = {
                id: data.products.length + 1,
                timestamp: Date.now(),
                name,
                price: +price,
                description,
                thumbnail,
                code,
                stock: +stock,
            };
            data.products.push(prodNuevo);
            this.saveProds(data);
            return res.json(prodNuevo);
    };

    supdate = async (req,res) => {
        const data = await this.listProds();
        const {id} = req.params;
        const {name, price, description, thumbnail, code, stock} = req.body;
        if (!name || !price || !description || !thumbnail || !code || !stock) {
            return res.status(400).json({success: false, error:'Error'});
        }
        const iProducts = data.products.findIndex((producto) => producto.id === +id);
        if (iProducts < 0) return res.status(404).json({ success: false, error: `El producto de id (${id}) no fue encontrado`})
        const productoN = {
            ...data.products[iProducts],
            timestamp: Date.now(),
            name,
            price: +price,
            description,
            thumbnail,
            code,
            stock: +stock,
        };
        data.products[iProducts] = productoN;
        this.saveProds(data);
        return res.json({ success: true, result: productoN});
    }

    del = async (req,res) => {

        /*
        const prods = await this.listProds();
        const { id } = req.params
        const product = prods.products.find(product => product.id === +id);
        console.log(product)
        if (!product) {
            return res.status(404).json({succes: false, error: `El producto de id ${id} no fue encontrado`})
        }
        */
        
        /*
        const prods = await this.listProds();
        const dataProds = prods.products;
        const { id } = req.params
        console.log(id);
        const productIndex = dataProds.findIndex(producto => producto.id === +id);
        console.log(dataProds);
        console.log(productIndex)
        */
        /*
        const { id } = req.params;
        const data = await this.listProds();
        const dataProds = data.products;
        console.log(dataProds)
        const productIndex = dataProds.findIndex((producto) => producto.id === +id);
        if (productIndex < 0) 
        return res.status(404).json({ success: false, error: `Producto id: ${id} no encontrado`});
        console.log(productIndex)
        const delProd = dataProds.filter((producto) => producto !== +id)
        delProd
        */
        //dataProds.splice(productIndex, 1)
        
        
        const {id} = req.params;
        const data = await this.listProds();
        const iProducts = data.products.findIndex((producto) => producto.id === +id);
        if (iProducts < 0)
        return res.status(404).json({ success: false, error: `El producto con el id (${id}) no fue encontrado`})
        
        return data.products.splice(iProducts, 1), res.json({success: true, result: 'El producto fue eliminado correctamente'})
        
    }
}

module.exports = ApiProductos;