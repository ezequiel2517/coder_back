const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { obtenerProductos, agregarProducto} = require("../services/servicesProductos.js");

const schema = new buildSchema(`
    type Producto {
        title: String
        price: Int
        thumbnail: String
    }

    input productoInput {
        title: String
        price: Int
        thumbnail: String
    }

    type Query {
        getProductos : [Producto]
    }

    type Mutation {
        saveProducto(producto: productoInput) : Producto
    }
`);

const rootValue = {
    getProductos: obtenerProductos,
    saveProducto: agregarProducto
}

module.exports = graphqlHTTP({ schema, rootValue, graphiql: true });