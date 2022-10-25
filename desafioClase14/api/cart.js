const {promises:fs} = require('fs');
const listproducts = './productslist/data.json';

class Cart {

    constructor(){
        this.prodcarts = listproducts;
    }

    allCart = async () => {
        const data = await fs.readFile(this.prodcarts, 'utf-8');
        const cartJ = await JSON.parse(data);
        return cartJ
    };

    saveCart = async (productos) => {
        const sData = JSON.stringify(productos, null, 2)
        await fs.writeFile(this.prodcarts, sData, 'utf-8');
    }

    getAll = async (req,res) => {
        const data = await this.allCart();
        const carrito = data.carrito;
        console.log(carrito[0].products);
        return res.json({success:true, result:carrito[0].products})  
    }

    getById = async (req,res) => {
        const prods = await this.allCart();
        const { id } = req.params
        const product = prods.products.find(product => product.id === +id);
        if (!product) {
            return res.status(404).json({ success: false, error: `El producto de id ${id} no fue encontrado`});
        }
        return res.send({ success: true, result: product })
    }

    save = async (req, res) => {
        const data = await this.allCart();
        const nCart = {
            id: data.carrito.length +1,
            timestamp: Date.now(),
            products:[]
        };
        data.carrito.push(nCart);
        this.saveCart(data);
        return res.send({ success: true, result: nCart});
    };



    supdate = async (req, res) => {
        const data = await this.allCart();
        const dataCar = data.carrito;
        const dataProd = data.products;
        const {IdCar, IdProd} = req.params;

        const carIndex = dataCar.findIndex(idCarrito => idCarrito.id === +IdCar);
        const prodIndex = dataProd.findIndex(idProduct => idProduct.id === +IdProd);
        
        if (carIndex < 0)
        return res.status(404).json({ success: false, error: `Carrito id: ${IdCar} no encontrado`});
        else if (prodIndex < 0)
        return res.status(404).json({ success: false, error: `Producto id: ${IdProd} no encontrado`});
        dataCar[carIndex].products.push(dataProd[prodIndex])
        this.saveCart(data);
        return res.json(dataCar);    
    };  

    /*
    supdate = async (req,res) => {
        
        const data = await this.allCart();
        const dCart = data.carrito;
        const dProds = data.products;
        const { idCart, idProds } = req.params;
        const iCart = dCart.findIndex(idCart => idCart.id === +idCart);
        const iProds = dProds.findIndex(idProds => idProds.id === +idProds);

        if (iCart < 0)
        return res.status(404).json({success: false, error: `El carrito con id: (${idCart}) no fue encontrado`})
        else if (iProds < 0)
        return res.status(404).json({success: false, error: `El producto con id: (${idProds}) no fue encontrado`})
        dCart[iCart].products.push(dProds[iProds])
        this.saveCart(data);
        return res.json(dCart);
        
    };
    */
    del = async (req,res) => {

        const data = await this.allCart();
        const dataCar = data.carrito;
        const dataProd = data.products;
        const {IdCart, IdProd} = req.params;
        const carIndex = dataCar.findIndex(idCarrito => idCarrito.id === +IdCart);
        const prodIndex = dataProd.findIndex(idProduct => idProduct.id === +IdProd);
        
        if (carIndex < 0)
        return res.status(404).json({ success: false, error: `Carrito id: ${IdCart} no encontrado`});
        else if (prodIndex < 0)
        return res.status(404).json({ success: false, error: `Producto id: ${IdProd} no encontrado`});
        dataCar[carIndex].products.splice(dataProd, 1)
        this.saveCart(data);
        return res.json(dataCar);  
        /*
        const data = await this.allCart();
        const carrito = data.carrito;
        const prodCarrito = data.carrito[0].products;
        const {IdCar, IdProd} = req.params;
        console.log(prodCarrito)
        const carIndex = carrito.findIndex(idCarrito => idCarrito.id === +IdCar);
        const prodIndex = prodCarrito.findIndex(idProduct => idProduct.id === +IdProd);
        
        if (carIndex < 0)
        return res.status(404).json({ success: false, error: `Carrito id: ${IdCar} no encontrado`});
        else if (prodIndex < 0)
        return res.status(404).json({ success: false, error: `Producto id: ${IdProd} no encontrado`});
        prodCarrito.splice(carIndex, 1);
        this.saveCart(data);
        return res.json({ success: true, result: 'Producto Eliminado'}); 
        */
        /*
        const data = await this.allCart();
        const dataCar = data.carrito;
        const dataProd = data.products;
        const {IdCar, IdProd} = req.params;

        const carIndex = dataCar.findIndex(idCarrito => idCarrito.id === +IdCar);
        const prodIndex = dataProd.findIndex(idProduct => idProduct.id === +IdProd);
        
        const data = await this.allCart();
        const {idCart, idProds} = req.params;
        const cart = data.cart;
        const pCart = data.cart(idCart-1).products;
        const iCart = cart.findIndex(idCarts => idCarts.id === +idCart);
        const iProds = pCart.findIndex(idProduct => idProduct.id === +idProds);
        if(iCart < 0)
        return res.status(404).json({success: false, error:`El carrito con id: (${idCart})`})
        if (iProds < 0)
        return res.status(404).json({success: false, error: `El producto con id: (${idProds}) no fue encontrado`})
        pCart.splice(iCart, 1);
        this.saveCart(data);
        return res.json({success: true, result: `El producto de id (${idProds}) ha sido eliminado`})
        */
    }

}

module.exports = Cart;