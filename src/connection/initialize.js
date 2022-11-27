//Importo knex 
const knex = require('knex');

//Importo options
const options = require('../connection/options.js');

//Inicio conexiones
const connectionChat = knex(options.sqlite3);
const connectionProductos = knex(options.mysql);

//Creo tablas si no existen
(async () => {
    //Chat
    const existeTableChat = await connectionChat.schema.hasTable('chat');
    if (!existeTableChat) {
        await connectionChat.schema.createTable('chat', (table) => {
            table.increments('id').primary();
            table.string('mensaje', 256).notNullable();
            table.string('email', 256).notNullable();
        })
    }
    //Productos
    const existeTableProductos = await connectionProductos.schema.hasTable('productos');
    if (!existeTableProductos) {
        await connectionProductos.schema.createTable('productos', (table) => {
            table.increments('id').primary();
            table.string('title', 256).notNullable();
            table.string('thumbnail', 256).notNullable();
            table.integer('price').unsigned().notNullable();
        })
    }
    connectionChat.destroy();
    connectionProductos.destroy();
})();

