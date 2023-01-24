module.exports = {
    mariaDb: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            database: 'demo16'
        }
    },
    sqLite: {
        client: 'sqLite',
        connection: {
            filename: '../db/sqlite/demo16.sqlite'
        }
    }

}