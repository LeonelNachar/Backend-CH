class Productos {
    productos = [
        {
            "id":1,
            "title": "River",
            "price": 1000,
            "thumbnail": "https://media.tycsports.com/files/2022/02/22/393443/escudo-river_w416.jpg"
        },
        {
            "id":2,
            "title": "Racing",
            "price": 750,
            "thumbnail": "https://www.racingclub.com.ar/img/escudo/escudo1995_2.png"
        },
        {
            "id":3,
            "title": "Independiente",
            "price": 500,
            "thumbnail": "https://i.pinimg.com/736x/76/1d/21/761d218d7770440910948ccea2860651.jpg"
        },
        {
            "id":4,
            "title": "San Lorenzo",
            "price": 250,
            "thumbnail": "https://contenidos2.sanlorenzo.com.ar/img/info/marca-pag2-aplicacionc.png"
        },
        {
            "id":5,
            "title":"Boca Juniors",
            "price": 0,
            "thumbnail": "https://www.bocajuniors.com.ar/rebrand/images/escudos/historia/Escudo-66-Estrellas.png"
        }
    ]

    generateId() {
		const lastProduct = this.productos[this.productos.length - 1];
		console.log(lastProduct);
		let id = 1;
		if (lastProduct) {
			id = lastProduct.id + 1;
		}

		return id;
	}

    addProduct(newData) {
		newData.id = this.generateId();

		this.productos.push(newData);

		return this.productos;
	}

    getById(id) {
		return this.productos.find(product => product.id === parseInt(id));
	}

    update(id, data) {
		let updatedProduct;

		const updatedProducts = this.productos.map(product => {
			if (product.id === parseInt(id)) {
				product = Object.assign(product, data);

				updatedProduct = product;
			}
			return product;
		});

		this.productos = updatedProducts;

		return updatedProduct;
	}

    getAll() {
		return this.productos;
	}

    deleteById(id) {
		const newProducts = this.productos.filter(
			product => product.id !== parseInt(id)
		);

		this.productos = newProducts;

		return this.productos;
	}

}

module.exports = Productos;