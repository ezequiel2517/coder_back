const options = {
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'ecommerce'
        },
        pool: { min: 0, max: 7 }
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: './src/db/persistence.sqlite'
        },
        useNullAsDefault: true
    },
    mongoAtlas: {
        connectionString: "mongodb+srv://ezequiel:ezequiel@cluster0.v5hpbf0.mongodb.net/usuarios?retryWrites=true&w=majority"
    }
};

module.exports = options;