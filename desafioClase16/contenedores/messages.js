const knex = require('knex');

class Messages {
    constructor(tableName, dbConfig) {
        this.tableName = tableName;
        this.knex = knex(dbConfig);


        this.knex.schema
            .hasTable(this.tableName)
            .then((response) => {
                if (response) {
                    return this.knex.schema.createTable(this.tableName, (table) => {
                        table.increments('id').notNullable();
                        table.string('email', 50).notNullable();
                        table.string('message').notNullable()
                        table.string('date', 15).notNullable();
                    })
                }
            })
    }

    async addMessage(data) {
        try {
            await this.knex(this.table).insert(data)
        } catch (err) {
            console.log(err)
        }

    }


    async getMessages() {
        try {
            const messages = await this.knex
            .from(this.table)
            .select('*')
            return messages
        } catch (err) {
            console.log(err)
        }
    }
    
}

module.exports = Messages