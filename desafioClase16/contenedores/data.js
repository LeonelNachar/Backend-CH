const knex = require('knex');

class Products {
    constructor (tableName, dbConfig) {
        this.tableName = tableName;
        this.knex = knex(dbConfig);
    
        this.knex.schema
            .hasTable(this.tableName)
            .then((response) => {
                if(response) {
                    return this.knex.schema.createTable(this.tableName, (table) => {
                        table.increments('id').notNullable()
                        table.string('nombre', 30).notNullable()
                        table.string('thumbnail').notNullable();
                        table.float('price').notNullable()
                    });
                }
            })
    }



    async getAll() {
        try {
            const products = await this.knex
                .from(this.tableName)
                .select('id', 'title', 'price', 'thumbnail')
            console.table(products)
            return products
        } catch (err) {
            console.log(err)
        }
    }

    async getById(id) {
        try {
            const product = await this.knex
                .from(this.tableName)
                .select('id', 'title', 'price', 'thumbnail')
                .where({id:id})
        } catch(err) {
            console.log(err)
        }
    }

    async save(product) {
        const { title, price, thumbnail } = product
        if ( !title || !price || !thumbnail ) {
            return null
        }

        const newProduct = {
            title,
            price,
            thumbnail,
        }

        try {
            await this.knex(this.tableName).insert(newProduct);
        } catch (err) {
            console.log(err);
        }
    }

    async update(id, product) {
        const { title, price, thumbnail} = product
        try {
            await this.knex.from(this.tableName)
            .where({id: id})
            .update({
                title: title,
                price: price,
                thumbnail: thumbnail
            })
        } catch (err) {
            console.log(err)
        }
    }

    async delById(id) {
        try {
            await this.knex.from(this.tableName).where({ id }).del()
        } catch (error) {
            console.log(err)
        }
    }

}

module.exports = Products;